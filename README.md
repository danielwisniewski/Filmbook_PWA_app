# Filmbook - PWA Angular application
<img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" /> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /> <a href="https://firebase.google.com/" target="_blank"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /> <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" />

<p align="center">
  <img src="https://github.com/danielwisniewski/Filmbook_PWA_app/blob/master/src/assets/icons/new_icon-144x144.png" alt="Filmbook"/>
</p>
<h4 align="center">Filmbook is a mobile app that based on rich database will recommend you interesting movies to watch as well as store history of already seen positions. Application (both frontend and backend) has been created from a scratch in learning purposes. Visual inspiration has been drawn from couple of projects from behance.net</h4>
<h2 align="center"><a href="https://movieapp-36b81.web.app/" >Live Demo</a></h2>

# Technologies and libraries
Like the other apps, Filmbook stands on the shoulders of giants. This is a list of used technologies and libraries:  
- [Angular](https://angular.io/): Angular Framework version 10.
- [Angular Material](https://material.angular.io/): Material Design components for Angular version 11.0.3.
- [Bootstrap](https://getbootstrap.com/): Bootstrap 5.
- [Firestore](https://firebase.google.com/docs/firestore): Flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud.
- [Angular Fire](https://www.npmjs.com/package/@angular/fire): The official Angular library for Firebase.
- [Node-RED](https://nodered.org/): Low-code programming for event-driven applications.

# Functionalities
Application is split into three main tabs:
<details> 
  <summary>Movies</summary>
  
  ##### In the movies tab we can find lists of:
  + Reccomened films and tv series
  + Top rated films and tv series
  + Top rated movies available in tv today
  + Movies in tv available beetween 19 and 21
  
  <img src="https://github.com/danielwisniewski/Filmbook_PWA_app/blob/main/movieapp-36b81.web.app_movies_recommended(Nexus%205X).png" height="732" width="392">
  <img src="https://github.com/danielwisniewski/Filmbook_PWA_app/blob/main/movieapp-36b81.web.app_movies_recommended(Nexus%205X)%20(1).png" height="732" width="392">
  <img src="https://github.com/danielwisniewski/Filmbook_PWA_app/blob/main/movieapp-36b81.web.app_movies_recommended(Nexus%205X)%20(3).png" height="732" width="392">
  <img src="https://github.com/danielwisniewski/Filmbook_PWA_app/blob/main/movieapp-36b81.web.app_movies_recommended(Nexus%205X)%20(5).png" height="732" width="392">
  <img src="https://github.com/danielwisniewski/Filmbook_PWA_app/blob/main/movieapp-36b81.web.app_movies_recommended(Nexus%205X)%20(6).png" height="732" width="392">
</details>

<details>
  <summary>Search</summary>
  
  #### In the search tab you can find movie by title.
  + List of movies aligned with search criteria
  + History of last 5 search results
  
  <img src="https://github.com/danielwisniewski/Filmbook_PWA_app/blob/main/movieapp-36b81.web.app_movies_recommended(Nexus%205X)%20(7).png" height="732" width="392">
  <img src="https://github.com/danielwisniewski/Filmbook_PWA_app/blob/main/movieapp-36b81.web.app_movies_recommended(Nexus%205X)%20(8).png" height="732" width="392">
  <img src="https://github.com/danielwisniewski/Filmbook_PWA_app/blob/main/movieapp-36b81.web.app_movies_recommended(Nexus%205X)%20(9).png" height="732" width="392">
</details>

<details>
  <summary>Profile</summary>
  
  #### In the profile tab you can find lists of movies that have been marked as seen or added to watchlist
  + List of movies added to watchlist sorted by added date
  + List of seen movies with possibility to sort by your rate or by time when watched
  + Input field to filter movies by part of title
  
  <img src="https://github.com/danielwisniewski/Filmbook_PWA_app/blob/main/movieapp-36b81.web.app_movies_recommended(Nexus%205X)%20(10).png" height="732" width="392">
  <img src="https://github.com/danielwisniewski/Filmbook_PWA_app/blob/main/movieapp-36b81.web.app_movies_recommended(Nexus%205X)%20(11).png" height="732" width="392">
</details>

#### Application has also shared detailed movie view. Features available in detailed view:
+ General information: polish title, year of production, country of production, director and rating on Filmweb.pl
+ Movie genre with hyperlink to other movies of such a genre
+ Short plot without spoilers
+ Scrolled pictures of main actors and subpage for entire cast
+ Subpage with list of streaming services where movie is available
+ Subpage with list of coming seances in tv
+ Subpage with list of nominations and won awards
+ Subpage with list of 30 movies categorized as a similar

<details>
  <summary>Detailed view screenshots</summary>
  
  <img src="https://github.com/danielwisniewski/Filmbook_PWA_app/blob/main/movieapp-36b81.web.app_detailView_film_300-2006-163597(Nexus%205X).png" height="732" width="392">
  <img src="https://github.com/danielwisniewski/Filmbook_PWA_app/blob/main/movieapp-36b81.web.app_detailView_film_300-2006-163597(Nexus%205X)%20(1).png" height="732" width="392">
  <img src="https://github.com/danielwisniewski/Filmbook_PWA_app/blob/main/movieapp-36b81.web.app_detailView_film_300-2006-163597(Nexus%205X)%20(2).png" height="732" width="392">
  <img src="https://github.com/danielwisniewski/Filmbook_PWA_app/blob/main/movieapp-36b81.web.app_detailView_film_300-2006-163597(Nexus%205X)%20(3).png" height="732" width="392">
  <img src="https://github.com/danielwisniewski/Filmbook_PWA_app/blob/main/movieapp-36b81.web.app_detailView_film_300-2006-163597(Nexus%205X)%20(4).png" height="732" width="392">
  <img src="https://github.com/danielwisniewski/Filmbook_PWA_app/blob/main/movieapp-36b81.web.app_detailView_film_300-2006-163597(Nexus%205X)%20(5).png" height="732" width="392">
  <img src="https://github.com/danielwisniewski/Filmbook_PWA_app/blob/main/movieapp-36b81.web.app_detailView_film_300-2006-163597(Nexus%205X)%20(6).png" height="732" width="392">
  <img src="https://github.com/danielwisniewski/Filmbook_PWA_app/blob/main/movieapp-36b81.web.app_detailView_film_300-2006-163597(Nexus%205X)%20(7).png" height="732" width="392">
</details>

# Contact data
[<img src='https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/github.svg' alt='github' height='40'>](https://github.com/danielwisniewski)  [<img src='https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/linkedin.svg' alt='linkedin' height='40'>](https://www.linkedin.com/in/daniel-wiśniewski-16831b131/) [<img src='https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/gmail.svg' alt='gmail' height='40'>](mailto:daniel.wisniewski3@gmail.com)  
