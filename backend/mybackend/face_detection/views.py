# face_detection/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from clarifai.client.model import Model
from django.http import HttpResponse

class FaceDetectionView(APIView):
    def post(self, request):
        PAT = 'c37b5e56b4d446f48071c891d8c33900'
        MODEL_ID = 'face-detection'
        IMAGE_URL = request.data.get('image_url')

        if not IMAGE_URL:
            return Response({"error": "No image URL provided."}, status=status.HTTP_400_BAD_REQUEST)

        model_url = f"https://clarifai.com/clarifai/main/models/{MODEL_ID}"
        detector_model = Model(
            url=model_url,
            pat=PAT,
        )

        try:
            prediction_response = detector_model.predict_by_url(
                IMAGE_URL, input_type="image"
            )

            # Log the raw response for debugging
            print("Prediction Response:", prediction_response)

            if not prediction_response.outputs:
                return Response({"error": "No outputs from Clarifai API."}, status=status.HTTP_400_BAD_REQUEST)

            regions = prediction_response.outputs[0].data.regions
            if not regions:
                return Response({"faces": [], "message": "No face detected."}, status=status.HTTP_200_OK)

            result = []
            for region in regions:
                bounding_box = region.region_info.bounding_box
                top_row = round(bounding_box.top_row, 3)
                left_col = round(bounding_box.left_col, 3)
                bottom_row = round(bounding_box.bottom_row, 3)
                right_col = round(bounding_box.right_col, 3)
                result.append({
                    "top_row": top_row,
                    "left_col": left_col,
                    "bottom_row": bottom_row,
                    "right_col": right_col
                })

            return Response({"faces": result}, status=status.HTTP_200_OK)
        
        except Exception as e:
            # Log the error
            print("Error during face detection:", str(e))
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# OLD VERSION
# class FaceDetectionView(APIView):
#     def post(self, request):
#         PAT = 'c37b5e56b4d446f48071c891d8c33900'
#         MODEL_ID = 'face-detection'
#         IMAGE_URL = request.data.get('image_url')

#         model_url = f"https://clarifai.com/clarifai/main/models/{MODEL_ID}"
#         detector_model = Model(
#             url=model_url,
#             pat=PAT,
#         )

#         try:
#             prediction_response = detector_model.predict_by_url(
#                 IMAGE_URL, input_type="image"
#             )

#             regions = prediction_response.outputs[0].data.regions
#             result = []
#             for region in regions:
#                 bounding_box = region.region_info.bounding_box
#                 top_row = round(bounding_box.top_row, 3)
#                 left_col = round(bounding_box.left_col, 3)
#                 bottom_row = round(bounding_box.bottom_row, 3)
#                 right_col = round(bounding_box.right_col, 3)
#                 result.append({
#                     "top_row": top_row,
#                     "left_col": left_col,
#                     "bottom_row": bottom_row,
#                     "right_col": right_col
#                 })

#             return Response({"faces": result}, status=status.HTTP_200_OK)
        
#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# This should be a standalone function, not a method
def index(request):
    return HttpResponse("Hello, this is the Face Detection API.")
