import React from "react";
import "./error.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';

export { ToastContainer, toast };

//Sets the starting point for counting error messages.
//Error messages will be dismissed after the value in the
//if statement in const notify is reached. 
//Page must start at -1 instead of 0, because 
//export var errorCount = -1;

//Defines default behavior for error message. 
//export function errorNotify(errorString) {
/*export const notify = (errorString) => {
        errorCount++;

        if(errorCount == 3){
            errorCount = 0;
            toast.dismiss();
        }

        toast.error(errorString, {
            transition: Zoom,
            position: "top-center",
            autoClose: "false"
        });
    }
*/

export const dismissAll = () => toast.dismiss();

//This sets the default values for error popups.
//Currently the popups are set to appear at the top center,
//to never autoclose, to require the user dismiss them by clicking
//or dragging off screen, to have a zoom animation onto the screen,
//and to set an ID value to the popup to prevent duplicates.
export const errorOptions = {
    position: toast.POSITION.TOP_CENTER,
    transition: Zoom,
    autoClose: false,
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
            position: "top-center",
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

export function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      navigator.permissions.query({name: 'geolocation'}).then(function(permissionStatus){
        console.log(permissionStatus);

        if(permissionStatus.state == 'prompt'){

            toast.error("Please Allow Location.", {
                toastId: "ToastPromptPermissionID",
                transition: Zoom,
                position: "top-right",
                autoClose: "false"
            });
            toast.clearWaitingQueue();
            getLocation();
        }

        else{
            toast.dismiss();
            toast.error("Location Access Blocked. Please allow by clicking location icon in search bar and selecting 'Always Allow.'", {
                toastId: "ToastPermissionDeniedID",
                transition: Zoom,
                position: "top-center",
                autoClose: "false"
            });
            toast.clearWaitingQueue();
        }
        
      });
      break;

    case error.POSITION_UNAVAILABLE:
      toast.dismiss();

      toast.error("Location information is unavailable. Refresh page.", {
        toastId: "ToastPositionUnavailableID",
        transition: Zoom,
        position: "top-center",
        autoClose: "false"
      });
      toast.clearWaitingQueue();


      break;

    case error.TIMEOUT:
      toast.dismiss();

      toast.error("The request to get user location timed out. Refresh page.", {
        toastId: "ToastTimeoutID",
        transition: Zoom,
        position: "top-center",
        autoClose: "false"
      });

      toast.clearWaitingQueue();
      break;

    case error.UNKNOWN_ERROR:
      toast.dismiss();

      toast.error("An unknown error occurred. Refresh page.", {
        toastId: "ToastUnknownErrorID",
        transition: Zoom,
        position: "top-center",
        autoClose: "false"
      });
      
      toast.clearWaitingQueue();
      break;
  }
}
