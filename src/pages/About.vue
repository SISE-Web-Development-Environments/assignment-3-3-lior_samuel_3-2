<template>
    <div class="aboutPage">
        <b-container>
            <div class="jumbotron" >
                <h1 >About Page</h1>
                <h3 >Creators : Samuel Benichou and Lior Baruchovitch</h3>

                <hr >
                <h2 >About Us</h2>
                <div align="left">
                    <p>We really enjoyed taking part of this course.</p>
                    <p>It give us opportunity to learn another language and create effective and captivating
                        websites with relative ease.</p>
                    <p>Web development is definitely a smoother path to developing application.</p>
                </div>

                <hr >
                <h2 >Site Information</h2>
                <div align="left">
                    <h5>As part of a third year course 'Web Development Environments' we created this Recipes Site Project
                        which was build in three separate stages:</h5>
                    <ul>
                        <li>Creating API: in charge of establishing communication between the Server and Clients</li>
                        <ul text="Creating server side using:">
                            <li>axios - using the external "spoonacular" API for recipes database</li>
                            <li>NODE js with 'express' </li>
                            <li>mssql</li>
                            <li>client-sessions (cookies) </li>
                        </ul>
                        <li>Creating client side using Vue (components,routers,vue-cli,bootstrap,vuelidate)</li>
                    </ul>
                </div>

                <hr >
                <h2 >Project Links</h2>
                <div align="left">
                    <ul >
                        <li>API:  <a href="">Assignment 3.1</a></li>
                        <li>Server Side:  <a href="">Assignment 3.2</a></li>
                        <li>Client Size:  <a href="">Assignment 3.3</a></li>
                    </ul>
                </div>

                <hr >
                <h2 >Our Pictures</h2>
                <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="../pictures/background 2.jpg" class="d-block w-100" alt="...">
                        </div>
                        <div class="carousel-item">
                            <img src="../pictures/background.jpg" class="d-block w-100" alt="...">
                        </div>
                        <div class="carousel-item">
                            <img src="../pictures/background.jpg" class="d-block w-100" alt="...">
                        </div>
                    </div>
                </div>

            </div>
        </b-container>
    </div>
</template>

<script>

</script>

<style scoped>

    .aboutPage{
        text-align: center;
        background-size: cover;
        background-image: url("../pictures/background.jpg");
    }

</style>
