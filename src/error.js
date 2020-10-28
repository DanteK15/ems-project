import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';

export { ToastContainer, toast };
export { Slide, Zoom, Flip, Bounce }
export const dismissAll = () => toast.dismiss();

//This sets the default values for error popups.
//Currently the popups are set to appear at the top center,
//to never autoclose, to require the user dismiss them by clicking
//or dragging off screen, to have a zoom animation onto the screen,
//and to set an ID value to the popup to prevent duplicates.
export const errorOptions = {
//    position: toast.POSITION.TOP_CENTER,
//    transition: Zoom,
//    autoClose: false,
    toastId: "dynamicError"
};

//The parent location services function that contains all the smaller
//location services functions.
export function getLocation() {
  if (navigator.geolocation) {

    //Function attempts to get current location, on success calls
    //showPosition, on error calls showError.
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } 

    //If the device doesn't have location services, the else statement
    //will be activated.
    else { 

        //User is alerted with an error popup that their device
        //does not support location services.
        toast.error("Location Services Not Supported By This Device", {
            transition: Zoom,
            position: "top-right",
            autoClose: "false",
            toastId: "noLocationServices"
    });
  }
}

//This function is called if navigator.geolocation.getCurrentPosition()
//successfully accesses geolocation and creates a position object which
//holds the user's coordinates and other values.
//It is unused for our application since the error function does not need
//the position coordinates to do anything.
export function showPosition(position) {
    //Left empty on purpose. No use for coordinates in error handler.
}

//If getCurrentPosition from above returns an error state, it will 
//call this function showError. Contains a switch statement for
//the different possible types of errors.
export function showError(error) {
  switch(error.code) {

    //Permission Denies is when the user has not enabled location servivces access
    case error.PERMISSION_DENIED:

      //permissions.query is used to determine is location services have been blocked
      //or if the user can still be prompted on the page. If blocked, the user has to enable
      //access in the search bar by clicking the location icon.
      navigator.permissions.query({name: 'geolocation'}).then(function(permissionStatus){

        //Dismisses all error messages that might erraneously be displayed.
        //Displays a new error message asking user to accept the location
        //access prompt. 
        if(permissionStatus.state == 'prompt'){
          toast.dismiss();
          toast.error("Please Allow Location.", {
            toastId: "ToastPromptPermissionID",
            transition: Zoom,
            position: "top-right",
            autoClose: "false"
          });

          //Location services can be prompted 3 times in Chrome in the web page
          //before Chrome will set location to be blocked for the domain. This
          //calls the entire function to check again and prompt again unless
          //location services are blocked.
          getLocation();
        }

        //This will trigger if location services have been blocked. At this point
        //the user will have to enable it by clicking the location icon in the search bar.
        else{
          toast.dismiss();
          toast.error("Location Access Blocked. Please allow by clicking location icon in search bar and selecting 'Always Allow.'", {
            toastId: "ToastPermissionDeniedID",
            transition: Zoom,
            position: "top-center",
            autoClose: "false"
          });
        }
        
      });
      break;

    //A message to the user when location services are enabled but not creating a position.
    case error.POSITION_UNAVAILABLE:
      toast.dismiss();

      toast.error("Location information is unavailable. Refresh page.", {
        toastId: "ToastPositionUnavailableID",
        transition: Zoom,
        position: "top-center",
        autoClose: "false"
      });
      break;

    //A message to the user if the location process is timing out.
    case error.TIMEOUT:
      toast.dismiss();

      toast.error("The request to get user location timed out. Refresh page.", {
        toastId: "ToastTimeoutID",
        transition: Zoom,
        position: "top-center",
        autoClose: "false"
      });
      break;

    //A message to the user for unknown errors. No solution advisable besides refresh.
    case error.UNKNOWN_ERROR:
      toast.dismiss();

      toast.error("An unknown error occurred. Refresh page.", {
        toastId: "ToastUnknownErrorID",
        transition: Zoom,
        position: "top-center",
        autoClose: "false"
      });
      break;
      
  }
}
