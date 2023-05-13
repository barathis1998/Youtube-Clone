[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/0wrsx4Jb)
# YOUTUBE CLONE

# Description of Project

- Creating an youtube clone

- Login : This feature allows registered users and administrators to log in to the web application using their email and password.

- Register: This feature enables new users to create an account by providing their name, email, and a password.

- Forgot Password: This feature enables users who have forgotten their password to reset it by requesting a password reset email.

- Search: This feature enables users to search for specific items within those sets.

- Video (CRUD): This feature allows users to create, read, update, and delete video content.

- Watch video: This feature allows users to watch video content on the web application.

- Increase Views: This feature tracks the number of views that a video content receives and updates the view count accordingly.

- Like video: This feature enables users to express their preference for video content by liking it.

- Comment & reply for video: This feature enables users to leave comments and replies on video content.

- Delete video: This feature allows users to delete their video content from the web application.

- Subscribe to a channel: This feature enables users to subscribe to channels and receive notifications when new video content is uploaded.

- Subscriptions: This feature displays a list of the channels to which the user is subscribed.

- History (CRUD): This feature allows users to view and delete their watch history.

- Settings: This feature allows users to modify their account settings, such as their channel name, email, and password.

- Modify channel name and email: This feature enables users to update the name and email associated with their channel.

- Change password: This feature allows users to change their password.




# Milestone

# Week 1: (23rd to 29th March)
- Create basic UI for all pages in the app
- Login flow
- Sign up flow
- Basic CRUD operation to get list of videos (display list of videos)

# Week 2: (30th march to 5th April)
- Create a new channel , Add new channel, delete channel (channel CRUD)
- Work on UI
- Work on get history for a particular user

# Week 3: (6th April to 11th April)
- Work on like, share, comment , subscribe features
- To create CRUD operations for delete a video, update video details

# Week 4: (12th April to 19th April)
- Test workflow
- Add validations
- Refine UI
- Identify flow and edge cases if required. 
- Presentation of the project



# User Stories assigned to

Week 1:
Designing basic UI for login page and sign up page - Aishwarya , Barathi
Designing basic home page which will show list of videos - Aishwarya , Harish

As a user, I should be able to:
Create and  Update an User account - Karthik , Barathi
Acceptance Criteria:
User email should be unique or not be used previously.
For updating the username, new username should not be used by others or it should be unique.

As a user, I should be able to:
View and Delete my account - Harish , Karthik
Acceptance Criteria:
To view the profile, user should be logged in.
Similary for deleting the profile, first the user should be logged in.


Week 2:
Design UI for channel page - Aishwarya
Create and Update channel code flow - barathi    
View and delete channel code flow - Harish
View history for a particular user flow with UI - Karthik

Week 3:
Design like, share and comment features with UI - Karthik
Upload video - Harish
Delete video operation with UI - Barathi
Test workflows with possible - Barathi


Week 4:
Create flow for subscribers/ subscription - Aishwarya , Barathi
Presentation of the project. - Harish , Aishwarya , barathi , Karthik
Video for project presentation. - Harish , Aishwarya , barathi , Karthik
Workflow testing and executing the project. - Harish , Aishwarya , barathi , Karthik
UI refining - Harish , Aishwarya , barathi , Karthik

# API Resources

Videos: You can retrieve information about specific videos or search for videos using the videos resource. For example, you can use the GET /videos endpoint to retrieve information about a specific video or a list of videos that match a search query.

Channels: You can retrieve information about YouTube channels, such as channel metadata, playlists, and subscriptions using the channels resource. For example, you can use the GET /channels endpoint to retrieve information about a specific channel or a list of channels that match a search query.

Comments: You can retrieve and manage comments on videos using the comments resource. For example, you can use the GET /comments endpoint to retrieve comments on a specific video or the POST /comments endpoint to add a new comment to a video.

Search: You can search for videos, channels, and playlists using the search resource. For example, you can use the GET /search endpoint to search for videos with a specific keyword or filter by various criteria, such as location, duration, or view count.

Subscriptions: You can manage subscriptions to channels using the subscriptions resource. For example, you can use the POST /subscriptions endpoint to subscribe a user to a channel or the DELETE /subscriptions endpoint to unsubscribe a user from a channel.

Activities: You can retrieve information about user activity on YouTube, such as liking a video or adding a video to a playlist, using the activities resource. For example, you can use the GET /activities endpoint to retrieve a list of a user's recent activity or the POST /activities endpoint to mark an activity as read.

Captions: You can manage captions for videos using the captions resource. For example, you can use the GET /captions endpoint to retrieve information about a specific caption track or the POST /captions endpoint to upload a new caption track.

# Object Model


![](images/UML.jpg)
