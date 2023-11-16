import boto3
import base64
from botocore.exceptions import ClientError
import logging 

logging.basicConfig(level=logging.INFO)
dynamodb = boto3.client('dynamodb')
table_name = "restaurant_menu_details"
table = dynamodb.Table(table_name)
s3 = boto3.client('s3')
s3_bucket = "table-reservation-app-s3-bucket"

def lambda_handler(event, context):
    try:
        # Extracting data from the incoming JSON
        logging.info("Extracting data from the incoming JSON")
        logging.info(event)
        res_id = event['email']
        res_name = event['res_name']
        item_name=event['item_name']
        item_description=event['description']
        item_categories=event['categories']
        item_image_base64 = event['menu_image_base64']
        menu_discount=False;
        menu_discount_rate="0.0";
        item_discount=False;
        item_discount_rate="0.0"

        # Creating menu_id for the restaurant
        logging.info("Creating menu_id for the restaurant")
        menu_id = f"{res_id}_{res_name}_menu"
        logging.info(menu_id)
        
        # Creating item_id
        logging.info("Creating item_id")
        item_id = f"{menu_id}_{item_name}"
        logging.info(item_id)
        
        #Splitting categories string
        logging.info("Splitting categories string")
        item_category_list=item_categories.split(",")
        logging.info(item_category_list)
        
        # Uploading the image to S3 bucket and retrieving the image url
        logging.info("Uploading the image to S3 bucket and retrieving the image url")
        item_images_directory=f"{menu_id}_images"
        logging.info(item_images_directory)
        item_image_url = upload_image_to_s3_bucket(item_image_base64, f"{item_images_directory}/{item_id}_image.jpg")
        logging.info(item_image_url)
        if item_image_url is None:
            logging.info("Error uploading item image to S3")
            return False
        
        # Creating menu item as a dictionary
        logging.info("Creating menu item as a dictionary")
        menu_item = {
                'M': {
                    'category': {'L': item_category_list},
                    'description': {'S': item_description},
                    'item_id': {'S': item_id},
                    'item_image_url': {'S': item_image_url},
                    'item_name': {'S': item_name},
                    'item_discount': {'BOOL': item_discount},
                    'item_discount_rate': {'S': item_discount_rate}
                }
        }
        menu_item_list={"L":[menu_item]}
        
        # Creating DynamoDB formatted for restaurant menu
        logging.info("Creating DynamoDB formatted for restaurant menu and inserting the item")
        update_expression = "SET #res_id = :res_id,#menu_discount = :menu_discount, #menu_discount_rate = :menu_discount_rate, #items = list_append(#items,:items)"
        expression_attribute_names = {'#res_id' : 'res_id','#menu_discount': 'menu_discount', '#menu_discount_rate': 'menu_discount_rate', '#items': 'items'}
        expression_attribute_values = {':res_id' : {'S': res_id},':menu_discount': {'BOOL': menu_discount}, ':menu_discount_rate': {'S': menu_discount_rate}, ':items': {'L':menu_item_list}}
        # Update DynamoDB item
        response = dynamodb.update_item(
            TableName=table_name,
            Key={'menu_id': {'S': menu_id}},
            UpdateExpression=update_expression,
            ExpressionAttributeNames=expression_attribute_names,
            ExpressionAttributeValues=expression_attribute_values,
            ReturnValues="ALL_NEW" 
        )
        logging.info(response['Attributes'])
        if(response['Attributes'] is not None):
            return True
        else:
            return False

    except Exception as e:
        logging.info(str(e))
        return False

def upload_image_to_s3_bucket(base64_image, image_key):
    # Decoding base64 image
    logging.info("Decoding base64 image")
    item_image=base64.b64decode(base64_image)
    try:
        s3.put_object(Body=item_image, Bucket=s3_bucket,Key=image_key)
        return f"https://{s3_bucket}.s3.amazonaws.com/{image_key}"
    except ClientError as e:
        logging.info(f"Error uploading to S3: {str(e)}")
        return None
    
