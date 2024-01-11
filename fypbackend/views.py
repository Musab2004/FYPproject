from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from datetime import timedelta
from .models import User
from .Serilizer import UserSerializer,QueryPostSerializer,QuestionSerializer,QuizSerializer,TopicSerializer,AnswersPostSerializer,ReportAnswersSerializer,ReportPostSerializer,StudyPlanSerializer,WeeklyGoalsSerializer,ChapterSerializer,BookSerializer
from .models import StudyPlan,Quiz,User,Topic,QueryPost,AnswersPost,ReportPost,ReportAnswers,WeeklyGoals,Quiz,Question,Chapter,Book
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.serializers import serialize
from django.shortcuts import get_object_or_404
from django.core.files.uploadedfile import TemporaryUploadedFile
from pikepdf import Pdf
import fitz
import PyPDF2
from datetime import datetime
import re
from django.http import JsonResponse
import json
from django.core.files.base import ContentFile
from io import BytesIO
# from utility_functions import extract_book_outline,extract_text_from_page_range,store_text
class AnswersPostListCreate(generics.ListCreateAPIView):
    queryset = AnswersPost.objects.all()
    serializer_class = AnswersPostSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
@api_view(['POST'])
def custom_login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({'error': 'Please provide both username and password'}, status=400)

    # Check user credentials (You might have your own logic here)
    # Assuming you have a custom user model named CustomUser
    try:
        user = User.objects.get(email_address=email)
    except User.DoesNotExist:
        return Response({'error': 'Invalid username or password'}, status=400)

    if not user.password==password:
        return Response({'error': 'Invalid username or password'}, status=400)
    user = User.objects.get(email_address=email)
    user.is_active = True
    user.save()
    print("User's 'is_active' status updated successfully.")
    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)
    user_data = serialize('json', [user]) 
     # Serialize the user object to JSON
    # print("profile pi is here : ",user.profile_pic.url)
    user_dict = json.loads(user_data)[0]['fields']  # Convert serialized data to dictionary
    # print(user_dict)
    user_dict['pk'] = user.pk
    # print(refresh)
    # print(access_token)
    return Response({'access_token': access_token,'user':user_dict})
class CompletedStudyPlans(generics.ListCreateAPIView):
    queryset = QueryPost.objects.all()
    serializer_class = QueryPostSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user_id = self.request.GET.get('user_id')  # Assuming the ID is sent via query parameters

        if user_id:
            study_plans=StudyPlan.objects.all().filter(owner=user_id,is_completed=True)
            return study_plans
        else:
            # If study plan ID is not provided, return an empty queryset or handle as needed
            return None
class OngoingStudyPLans(generics.ListCreateAPIView):
    queryset = StudyPlan.objects.all()
    serializer_class = StudyPlanSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user_id = self.request.GET.get('user_id')  # Assuming the ID is sent via query parameters

        if user_id:
            study_plans=StudyPlan.objects.all().filter(owner=user_id,is_completed=False)
            return study_plans
        else:
            # If study plan ID is not provided, return an empty queryset or handle as needed
            return None
@api_view(['POST'])
def UpvoteComment(request):
    user_id = request.data.get('user')
    comment_id = request.data.get('comment')
    user=User.objects.get(id=user_id)
    answer=AnswersPost.objects.get(id=comment_id)
    answer.is_upvoted.add(user)
    return Response({'response': 'all good baby'})         
@api_view(['POST'])
def DownvoteComment(request):
    user_id = request.data.get('user')
    comment_id = request.data.get('comment')
    answer=AnswersPost.objects.get(id=comment_id)
    answer.is_upvoted.remove(user_id) 
    return Response({'response': 'all good baby'})    
@api_view(['POST'])
def UpvotePost(request):
    user_id = request.data.get('user')
    post_id = request.data.get('post')
    post=QueryPost.objects.get(id=post_id)
    user=User.objects.get(id=user_id)
    # print(user)
    post.is_upvoted.add(user)
    # post.save()
    # print(post.author)
    # print("likes people : ",post.is_upvoted.all())
    return Response({'response': 'all good baby'})          
@api_view(['POST'])
def DownvotePost(request):
    user_id = request.data.get('user')
    post_id = request.data.get('post')
    post=QueryPost.objects.get(id=post_id)
    post.is_upvoted.remove(user_id)  
    return Response({'response': 'all good baby'})
# @api_view(['POST'])
# def OngoingStudyPLans(request):
#     user_id = request.data.get('user_id')
#     post=User.objects.get(id=user_id)


#     return Response(serializer.data)
# @api_view(['POST'])
# def CompletedStudyPlans(request):
#     user_id = request.data.get('user_id')
#     post=User.objects.get(id=user_id)
#     study_plans=StudyPlan.objects.all().filter(owner=user_id,is_completed=True)
#     serializer = StudyPlanSerializer(study_plans, many=True)

    return Response(serializer.data)
@api_view(['POST'])
def OnlyJoinedStudyPlans(request):
    user_id = request.data.get('user_id')
    post=User.objects.get(id=user_id)
    study_plans=StudyPlan.objects.all().filter(members=user_id)
    serializer = StudyPlanSerializer(study_plans, many=True)

    return Response(serializer.data)
@api_view(['POST'])
def OwnedStudyPlans(request):
    user_id = request.data.get('user_id')
    post=User.objects.get(id=user_id)
    study_plans=StudyPlan.objects.all().filter(owner=user_id)
    serializer = StudyPlanSerializer(study_plans, many=True)

    return Response(serializer.data)             
class AnswersPostDetailsUpdate(generics.RetrieveUpdateAPIView):
    queryset = AnswersPost.objects.all()
    serializer_class = AnswersPostSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class QuestionListCreate(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]


class QuestionDetailsUpdate(generics.RetrieveUpdateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]


class QuizListCreate(generics.ListCreateAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]


class QuizDetailsUpdate(generics.RetrieveUpdateAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class WeeklyGoalsListCreate(generics.ListCreateAPIView):
    queryset = WeeklyGoals.objects.all()
    serializer_class = WeeklyGoalsSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def create(self, request, *args, **kwargs):
    # Get the studyplan_id, chapters_id, and start_date from the request
        # WeeklyGoals.objects.all().delete()
        studyplan_id = request.data.get('studyplan_id')
        chapters_id = request.data.get('chapters_id')
        start_date = request.data.get('start_date')
        order = request.data.get('order')
        date_string = re.sub(r'\(.*\)', '', start_date)
        start_date = datetime.strptime(date_string.strip(), "%a %b %d %Y %H:%M:%S %Z%z").date()
        # start_date = datetime.strptime(start_date, "%a %b %d %Y %H:%M:%S %Z%z").date()
    # Get the StudyPlan object from the studyplan_id
        studyplan = get_object_or_404(StudyPlan, id=int(studyplan_id))
        prev_order=int(order)-1
        start_date=start_date+timedelta(weeks=int(prev_order))
        end_date=start_date+timedelta(weeks=int(order))
        # Get all Chapter objects from the chapters_id
        chapters_id_list = [int(id) for id in chapters_id.split(',')]
        chapters = Chapter.objects.filter(id__in=chapters_id_list)

        # Create a new WeeklyGoals object
        weekly_goals = WeeklyGoals.objects.create(study_plan=studyplan,order=int(order), start_date=start_date,end_date=end_date)

        # Add the chapters to the weekly_goals
        for chapter in chapters:
            weekly_goals.topics_to_be_covered.add(chapter)

        # Save the weekly_goals object
        weekly_goals.save()
        # WeeklyGoals.objects.all().delete()
        return Response({'response': 'all good baby'})

class WeeklyGoals_all_StudyPlan(generics.ListCreateAPIView):
    queryset = WeeklyGoals.objects.all()
    serializer_class = WeeklyGoalsSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def list(self, request, *args, **kwargs):
        studyplan_id = request.GET.get('studyplan_id')  # Assuming the ID is sent via query parameters
        studyplan = StudyPlan.objects.get(pk=studyplan_id)
        print("Study Plans : ", studyplan)
        result = []
        if studyplan:
            weeklygoals = WeeklyGoals.objects.all().filter(study_plan=studyplan)
            for weeklygoal in weeklygoals:
                all_weekly_goals = {}
                all_weekly_goals['weekly_goals'] = WeeklyGoalsSerializer(weeklygoal).data
                all_weekly_goals['chapters'] = []
                for chapter in weeklygoal.topics_to_be_covered.all():
                    print(chapter)
                    all_weekly_goals['chapters'].append(ChapterSerializer(chapter).data)
                result.append(all_weekly_goals)
            print(result)        
            return Response(result)
        else:
            # If study plan ID is not provided, return an empty queryset or handle as needed
            return Response([])
class WeeklyGoalsDetailsUpdate(generics.RetrieveUpdateAPIView):
    queryset = WeeklyGoals.objects.all()
    serializer_class = WeeklyGoalsSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class ReportAnswersListCreate(generics.ListCreateAPIView):
    queryset = ReportAnswers.objects.all()
    serializer_class = ReportAnswersSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]


class ReportAnswersDetailsUpdate(generics.RetrieveUpdateAPIView):
    queryset = ReportAnswers.objects.all()
    serializer_class = ReportAnswersSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class ReportPostListCreate(generics.ListCreateAPIView):
    queryset = ReportPost.objects.all()
    serializer_class = ReportPostSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return QueryPost.objects.filter(reported_posts__isnull=True)


class ReportPostDetailsUpdate(generics.RetrieveUpdateAPIView):
    queryset = ReportPost.objects.all()
    serializer_class = ReportPostSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class AnswersPostListCreate(generics.ListCreateAPIView):
    queryset = AnswersPost.objects.all()
    serializer_class = AnswersPostSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        post_id = self.request.GET.get('post_id')  # Assuming the ID is sent via query parameters

        if post_id:
            # Filter QueryPost objects by study plan ID
            return AnswersPost.objects.filter(post=post_id)
        else:
            # If study plan ID is not provided, return an empty queryset or handle as needed
            return AnswersPost.objects.none()


class AnswersPostDetailsUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset = AnswersPost.objects.all()
    serializer_class = AnswersPostSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class QueryPostListCreate(generics.ListCreateAPIView):
    queryset = QueryPost.objects.all()
    serializer_class = QueryPostSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        study_plan_id = self.request.GET.get('study_plan_id')  # Assuming the ID is sent via query parameters
        # QueryPost.objects.all().delete()
        if study_plan_id:
            query_posts = QueryPost.objects.filter(reported_posts__isnull=True).order_by('-created_at')
            print(query_posts)
            # Filter QueryPost objects by study plan ID
            return query_posts.filter(study_plan=study_plan_id)
        else:
            # If study plan ID is not provided, return an empty queryset or handle as needed
            return QueryPost.objects.none()


class QueryPostDetailsUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset = QueryPost.objects.all()
    serializer_class = QueryPostSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class TopicListCreate(generics.ListCreateAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]


class TopicDetailsUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class ChapterListCreate(generics.ListCreateAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]


class ChapterDetailsUpdate(generics.RetrieveUpdateDestroyAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class BookListCreate(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]


class BookDetailsUpdate(generics.RetrieveUpdateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        try:
            # Retrieve the specific book object based on the provided ID in the URL
            print("this function is called.......................")
            book = self.get_object()
            
            # Retrieve related chapters for the book
            chapters = Chapter.objects.filter(book=book)
            
            # Initialize an empty list to store topics data for each chapter
            chapters_with_topics = []
            
            # Iterate through each chapter to fetch related topics
            for chapter in chapters:
                # Retrieve related topics for the current chapter
                topics = Topic.objects.filter(chapter=chapter)
                
                # # Serialize topics for the current chapter
                serialized_topics = [{'topic_id':topic.id,'title': topic.title, 'order':topic.order} for topic in topics]
                
                # Append chapter data along with topics to the list
                chapters_with_topics.append({
                    'chapter_id':chapter.id,
                    'chapter_name': chapter.title,
                    'chapter_order':chapter.order,
                    'topics': serialized_topics
                })
            
            # Serialize the book object
            serializer = self.get_serializer(book)
            
            # Construct the response data including chapters and topics
            response_data = {
                'book_details': serializer.data,
                'chapters_details': chapters_with_topics
            }
            return Response(response_data)
        except Book.DoesNotExist:
            return Response(
                {"detail": "Book not found"},
                status=status.HTTP_404_NOT_FOUND
            )

class StudyPlanListCreate(generics.ListCreateAPIView):
    queryset = StudyPlan.objects.all()
    serializer_class = StudyPlanSerializer
    def create(self, request, *args, **kwargs):
        # Assuming you want to customize the creation process
        name = request.data.get('name')  # Assuming 'name' is a field in StudyPlan model
        subject = request.data.get('subject')
        owner = request.data.get('owner')
        duration = request.data.get('duration')  # Assuming 'description' is a field in StudyPlan model
        academic_level = request.data.get('academic_level')
        is_public = request.data.get('is_public')
        QuizesPerWeek = request.data.get('QuizesPerWeek')  # Assuming 'description' is a field in StudyPlan model
        file = request.FILES.get('books')
        if is_public=="public":
            is_public=True
        else:
            is_public=False    
        book_title=str(file)
        pdf_data = file.read()
        Book.objects.all().delete()
        book = Book.objects.create(title=book_title)
        book_outline=extract_book_outline(file)
        print("Book outline : ",book_outline)
        store_text(file,book_outline,book_title,book)
        user=User.objects.get(id=owner)
        pdf_bytes = BytesIO(pdf_data)
        doc = fitz.open("pdf", pdf_bytes)
        page = doc.load_page(0)  # number of page
        pix = page.get_pixmap()
        image_bytes = pix.tobytes()
        image_content = ContentFile(image_bytes)
        doc.close()
        study_plan = StudyPlan.objects.create(
            name=name,
            owner=user,
            duration=duration,
            QuizesPerWeek=int(QuizesPerWeek),  # Replace with desired duration
            subject=subject,
            academic_level=academic_level,
            is_public=is_public,
            is_completed=False,
        )
        study_plan.image.save(f"title_page.png", image_content)
        study_plan.books.add(book)
        study_plan.save()
        study_plan_serializer = StudyPlanSerializer(study_plan)
        return Response(study_plan_serializer.data)



class StudyPlanDetailsUpdate(generics.RetrieveUpdateAPIView):
    queryset = StudyPlan.objects.all()
    serializer_class = StudyPlanSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]



class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer



class UserDetailsUpdate(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]


def extract_book_outline(file):
        titles=[]
        lower_page_range=[]
        upper_page_range=[]
        pdf=Pdf.open(file)
        outline = pdf.open_outline()
        print(outline)
        chapter_name=""
        all_content=[]
        try :
            for title in outline.root:
                    print("title : ",title)
                    topics_list=[]
                    my_dict={}
                    numbers = re.findall(r'\d+', str(title))
                    if len(numbers)>1:
                        chapter_name=title.title
                        my_dict['chapter']=chapter_name
                        my_dict['page_number']=numbers[-1]
                    for subtitle in title.children:
                        print("subttitle : ",subtitle.title)
                        my_inner_dict={}
                        numbers = re.findall(r'\d+', str(subtitle))
                        print("numbers : ",numbers)
                        if len(numbers)>1:
                            
                            my_inner_dict['topic']=subtitle.title
                            my_inner_dict['page_number']=numbers[-1]
                            topics_list.append(my_inner_dict)
                            # print(subtitle.title,numbers)
                            lower_page_range.append(numbers[-1])
                    my_dict['topics']=topics_list
                    print("My dict : ", my_dict)
                    all_content.append(my_dict)
        except Exception as e:
            print(e)                       
        return all_content
def extract_text_from_page_range(pdf_file, start_page, end_page):
        print("page number here : ",start_page,end_page)
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        print("length of file : ",len(pdf_reader.pages))
        extracted_text = ''
        for page_num in range(start_page,end_page):
            page = pdf_reader.pages[page_num - 1]
            extracted_text += page.extract_text()
        
        return extracted_text   
def store_text(file,outline,book_title,book):
    Chapter.objects.all().delete()
    Topic.objects.all().delete()

    
    i=1
    for chapters in outline:
     
     try :
      print(chapters['chapter'])
      chapter = Chapter.objects.create(book=book, title=chapters['chapter'], order=i)
      i=i+1
      j=1
      for topics in chapters['topics']:
          print(topics)
          content=extract_text_from_page_range(file,int(chapters['topics'][j-1]['page_number']),int(chapters['topics'][j]['page_number']))
          topic = Topic.objects.create(chapter=chapter, title=topics['topic'], content=content,order=j)
          j=j+1
     except:
         pass
   
 