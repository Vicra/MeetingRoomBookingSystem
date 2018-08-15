var selectedGuests = [];
function guestIsAlreadyAdded(array, guestObject){
    for (var i = 0; i < array.length; i++) {
        if(array[i].name == guestObject.name && array[i].id == guestObject.id){
            return true;
        }
    }
    return false;
}
function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].name.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].name.substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].name.substr(val.length);
                b.innerHTML += " (" + arr[i].email + ")";
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' id='name' value='" + arr[i].name + "'>";
                b.innerHTML += "<input type='hidden' id='id' value='" + arr[i].id + "'>";
                b.innerHTML += "<input type='hidden' id='id' value='" + arr[i].email + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    elementoLi = document.createElement("LI");
                    var guestName = this.getElementsByTagName("input")[0].value;
                    var guestId = parseInt(this.getElementsByTagName("input")[1].value);
                    var guestEmail = this.getElementsByTagName("input")[2].value;
                    elementoLi.setAttribute("class", "guest_" + guestId); 
                    // push values to array of selected guests
                    if(!guestIsAlreadyAdded(selectedGuests, {id: guestId, name: guestName, email:guestEmail})){
                        selectedGuests.push({id: guestId, name: guestName, email:guestEmail});

                        elementoLi.innerHTML = 
                            "<div>" + 
                            "<img src=\"http://www.skywardimaging.com/wp-content/uploads/2015/11/default-user-image.png\" height=\"20\" width=\"20\" style=\"margin:2%\"></img>" +
                            guestName + " (" + guestEmail + ")" +
                            "<a class=\"removeItem\"> x</a>" + 
                            "</div>" ;
                        var guestList = document.getElementById("invitedGuests");
                        guestList.appendChild(elementoLi);
                        document.getElementById("myInput").value = "";
                    }
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }

        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            var name_email_search = arr[i].name + " (" + arr[i].email + ")";
            if (name_email_search.toUpperCase().includes(val.toUpperCase()) && name_email_search.substr(0, val.length).toUpperCase() != val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                
                var startingPosition = name_email_search.toUpperCase().indexOf(val.toUpperCase());
                b.innerHTML = name_email_search.substr(0, startingPosition);
                b.innerHTML += "<strong>" + name_email_search.substr(startingPosition, val.length) + "</strong>";
                b.innerHTML += name_email_search.substr(startingPosition + val.length, name_email_search.length);

                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' id='name' value='" + arr[i].name + "'>";
                b.innerHTML += "<input type='hidden' id='id' value='" + arr[i].id + "'>";
                b.innerHTML += "<input type='hidden' id='id' value='" + arr[i].email + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    elementoLi = document.createElement("LI");
                    var guestName = this.getElementsByTagName("input")[0].value;
                    var guestId = parseInt(this.getElementsByTagName("input")[1].value);
                    var guestEmail = this.getElementsByTagName("input")[2].value;

                    elementoLi.setAttribute("class", "guest_" + guestId); 
                    // push values to array of selected guests
                    if(!guestIsAlreadyAdded(selectedGuests, {id: guestId, name: guestName, email:guestEmail})){
                        selectedGuests.push({id: guestId, name: guestName, email:guestEmail});

                        elementoLi.innerHTML = 
                            "<div>" + 
                            "<img src=\"http://www.skywardimaging.com/wp-content/uploads/2015/11/default-user-image.png\" height=\"20\" width=\"20\" style=\"margin:2%\"></img>" +
                            guestName + " (" + guestEmail + ")" +
                            "<a class=\"removeItem\"> x</a>" + 
                            "</div>" ;
                        var guestList = document.getElementById("invitedGuests");
                        guestList.appendChild(elementoLi);
                        document.getElementById("myInput").value = "";
                    }
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x){
            x = x.getElementsByTagName("div");
        }
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x){
                    x[currentFocus].click();
                }
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    function removeGuestItem(id){
        var positionToRemove = -1;
        for (var i = 0; i < selectedGuests.length; i++) {
            if(selectedGuests[i].id == id){
                positionToRemove = i;
                break;
            }
        }
        if(positionToRemove >= 0){
            selectedGuests.splice(positionToRemove, 1);
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
        if(e.target && e.target.className == 'removeItem'){
            var itemClassName = e.target.parentNode.parentNode.className;
            //remove html object
            $('.'+itemClassName).remove();
            //remove from array object
            removeGuestItem(itemClassName.split('_')[1]);
        }
    });
}

function addOrganizerGuestItem(guest){
    selectedGuests.push(guest);
    // formar item
    elementoLi = document.createElement("LI");
    elementoLi.setAttribute("class", "guest_" + guest.id); 
    elementoLi.innerHTML = 
        "<div>" + 
        "<img src=\"http://www.skywardimaging.com/wp-content/uploads/2015/11/default-user-image.png\" height=\"20\" width=\"20\" style=\"margin:2%\"></img>" +
        guest.name + " <strong>(Organizer)</strong>" +
        "</div>" ;

    var guestList = document.getElementById("invitedGuests");
    guestList.appendChild(elementoLi);
}