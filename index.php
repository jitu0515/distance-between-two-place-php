<!DOCTYPE html>
<html lang='en'>
   <head>
      <title>Find Location</title>
      <meta charset='utf-8' />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <script defer src="https://maps.googleapis.com/maps/api/js?libraries=places&key=PLACE YOUR KEY HERE" type="text/javascript"></script>
      <link rel="shortcut icon" href="map.pnga" type="image/x-icon">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
      <style type="text/css">
         a:hover{
         cursor: pointer;
         text-decoration: unset;
         }

         .heading_anchor{
            background: #8142b1 !important; 
            color: #fff !important;
         }

         .define_height{
             height: 450px;
         }
      </style>
   </head>
   <body>
      <div class='navbar navbar-default navbar-static-top heading_anchor'>
         <div class='container-fluid'>
            <div class="navbar-header">
               <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
               <span class="icon-bar"></span>
               <span class="icon-bar"></span>
               <span class="icon-bar"></span>
               </button>
               <a class='navbar-brand heading_anchor' href='#'>Search on Map</a>
            </div>
            <div class="navbar-collapse collapse">
               <ul class="nav navbar-nav navbar-right">
                  <li class='active'>
                     <a href=""  class="heading_anchor">Search path between two locations by selecting Travel Mode...</a>
                  </li>
               </ul>
            </div>
            <!--/.nav-collapse -->
         </div>
      </div>
      <div class='container-fluid'>
         <div class='row'>
            <div class='col-md-4'>
               <p>Welcome to SEARCH ON MAP Panel, Just Enter your origin point and your Destination where you want to  go.</p>
               <div class='well define_height'>
                  <form id="distance_form">
                     <div class="form-group">
                        <label>Enter Origin</label>
                        <input class="form-control" id="from_places" placeholder="Enter Origin"/>
                        <input id="origin" name="origin" required="" type="hidden"/>
                        <a onclick="getCurrentPosition()">Set Current Location</a>
                     </div>
                     <div class="form-group">
                        <label>Enter Destination</label>
                        <input class="form-control" id="to_places" placeholder="Enter Destination"/>
                        <input id="destination" name="destination" required="" type="hidden"/>
                     </div>
                     <div class="form-group">
                        <label>Travel Mode</label>
                        <select class="form-control" id="travel_mode" name="travel_mode">
                           <option value="DRIVING">Driving</option>
                           <option value="WALKING">Walking</option>
                           <option value="BICYCLING">Bicycle</option>
                           <option value="TRANSIT">Transit</option>
                        </select>
                     </div>
                     <input class="btn btn-primary" type="submit" value="Find" style="background: #8142b1; width: 100%; border: 0px;" />
                  </form>
                  <div class="row" style="padding-top: 20px;">
                     <div class="container">
                        <p id="in_mile"></p>
                        <p id="in_kilo"></p>
                        <p id="duration_text"></p>
                     </div>
                  </div>
               </div>
            </div>
            <div class='col-md-8'>
               <noscript>
                  <div class='alert alert-info'>
                     <h4>Your JavaScript is disabled</h4>
                     <p>Please enable JavaScript to view the map.</p>
                  </div>
               </noscript>
               <div id="map" style="height: 500px; width: 100%" ></div>
            </div>
         </div>
      </div>
      <script src="map.js"></script>
   </body>
</html>