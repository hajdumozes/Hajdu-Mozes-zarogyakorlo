// ! 1. feladat
function divideNumbersAndUnknowns(userDatas) {
  var numberArray = [];
  var trashArray = [];
  for (var i = 0; i < userDatas.length; i++) {
    if (userDatas[i].cost_in_credits !== 'unknown') {
      numberArray.push(userDatas[i]);
    } else {
      trashArray.push(userDatas[i]);
    }
  }
  return {
    numbers: numberArray,
    trash: trashArray
  };
}

function bubbleSortByPricesAscending(userDatasFiltered) {
  var costNumbers = divideNumbersAndUnknowns(userDatasFiltered).numbers;
  var change;
  var i = costNumbers.length - 1;
  while (i > 0) {
    change = 0;
    for (var j = 0; j < i; j++) {
      if (parseInt(costNumbers[j].cost_in_credits, 10) > // ? A Jason miatt még stringben vannak.
        parseInt(costNumbers[j + 1].cost_in_credits, 10)) {
        [costNumbers[j], costNumbers[j + 1]] = [costNumbers[j + 1], costNumbers[j]];
        change = j;
      }
    }
    i = change;
  }
  return costNumbers;
}

function mergeUnknowsWithSortedNumbers(userDatasFiltered) {
  var unknowns = divideNumbersAndUnknowns(userDatasFiltered).trash;
  var sortedNumbers = bubbleSortByPricesAscending(userDatasFiltered);
  var mergedData = sortedNumbers.concat(unknowns);
  return mergedData;
}

// ! 2. feladat
function deleteConsumablesNullObjects(userDatasInput) {
  for (var i = 0; i < userDatasInput.length; i++) {
    if (userDatasInput[i].consumables === null) {
      userDatasInput.splice(i, 1); // ? Törli az i indexű elemét a tömbnek.
      i--; // ? A splice módosítja a tömb hosszát. Ezért egyet visszaugrunk.
    }
  }
  return userDatasInput;
}

// ! 3. feladat
function replaceNullsWithUnknown(userDatasInput) {
  for (var i = 0; i < userDatasInput.length; i++) {
    for (var k in userDatasInput[i]) {
      if (userDatasInput[i][k] === null) {
        userDatasInput[i][k] = 'unknown';
      }
    }
  }
}

// ! 4. feladat
// ? Az n betű után már nincsenek képek, erre van ez a függvény
function insertPicturesAfterAlphabetN(modifiedDatasInput) {
  for (var i = 0; i < modifiedDatasInput.length; i++) {
    if (modifiedDatasInput[i].image[0] > 'n') {
      modifiedDatasInput[i].image = 'noship.jpg';
    }
  }
}

function createContentToHTML(modifiedDatasInput, SelectedDiv) {
  var content = '';
  for (var i = 0; i < modifiedDatasInput.length; i++) {
    var tempDiv = createTempDiv(i);
    for (var k in modifiedDatasInput[i]) {
      if (modifiedDatasInput[i].hasOwnProperty(k)) {
        content += `${k} : ${modifiedDatasInput[i][k]} <br>`;
      }
    }
    content += `<img src='../img/${modifiedDatasInput[i].image}' class="imageMozes"
    alt='${modifiedDatasInput[i].model}'>`;
    tempDiv.innerHTML = content;
    SelectedDiv.appendChild(tempDiv);
    content = '';
  }
}

function createTempDiv(i) {
  var tempDiv = document.createElement('div');
  tempDiv.className = `div-mozes${i}`;
  tempDiv.classList.add('div-task4');
  return tempDiv;
}

// ! 5. feladat


function addEvents() {
  var myDivs = document.querySelectorAll('.div-task4');
  for (var i = 0; i < myDivs.length; i++) {
    myDivs[i].addEventListener('click', thisDivToTheSide);
  }
}

// ? Az elnevezések és a feltételek a "putToTheSideDiv" függvény miatt vannak (7.feladat)
function thisDivToTheSide(mouseEvent) {
  var divToTheSide = createEmptyDivToTheSide().divToTheSide;
  var sideDiv = createEmptyDivToTheSide().sideDiv;
  divToTheSide.innerHTML = mouseEvent.path[0].innerHTML;
  divToTheSide.innerHTML =
    divToTheSide.innerHTML.replace('imageMozes', ''); // ? class csere
  deletePreviousDivFromTheSide();
  sideDiv.appendChild(divToTheSide);
}

function createEmptyDivToTheSide() {
  var sideDiv = document.querySelector('.one-spaceship');
  // sideDiv.style.color = 'white';
  var divToTheSide = document.createElement('div');
  divToTheSide.id = 'divToDelete';
  return {
    divToTheSide: divToTheSide,
    sideDiv: sideDiv
  };
}

function deletePreviousDivFromTheSide() {
  var sideDiv = document.querySelector('.one-spaceship');
  if (sideDiv.querySelector('#divToDelete')) {
    var divToDelete = sideDiv.querySelector('#divToDelete');
    sideDiv.removeChild(divToDelete);
  }
}

// ! 6. feladat
function searchForCrew1Ships(modifiedDatasInput, SelectedDiv) {
  var crew1 = 0;
  for (var i = 0; i < modifiedDatasInput.length; i++) {
    if (modifiedDatasInput[i].crew === '1') {
      crew1++;
    }
  }
  var Crew1ShipsDiv = createEmptyDivToTheSide().divToTheSide;
  Crew1ShipsDiv.className = 'ships-stats';
  Crew1ShipsDiv.innerHTML = `Ships with crew of 1:  ${crew1}`;
  SelectedDiv.appendChild(Crew1ShipsDiv);
}

function searchForBiggestCargoCapacity(modifiedDatasInput, SelectedDiv) {
  var max = modifiedDatasInput[0];
  for (var i = 0; i < modifiedDatasInput.length; i++) {
    if (parseInt(modifiedDatasInput[i].cargo_capacity, 10) > parseInt(max.cargo_capacity, 10)) {
      max = modifiedDatasInput[i];
    }
  }
  var BiggestCargoShipDiv = createEmptyDivToTheSide().divToTheSide;
  BiggestCargoShipDiv.className = 'ships-stats';
  BiggestCargoShipDiv.innerHTML = `Model with the biggest cargo:  ${max.model}`;
  SelectedDiv.appendChild(BiggestCargoShipDiv);
}

function sumAllPassengers(modifiedDatasInput, SelectedDiv) {
  var passengersSum = 0;
  for (var i = 0; i < modifiedDatasInput.length; i++) {
    if (modifiedDatasInput[i].passengers !== 'unknown') {
      passengersSum += parseInt(modifiedDatasInput[i].passengers, 10);
    }
  }
  var allPassengersDiv = createEmptyDivToTheSide().divToTheSide;
  allPassengersDiv.className = 'ships-stats';
  allPassengersDiv.innerHTML = `All passengers:  ${passengersSum}`;
  SelectedDiv.appendChild(allPassengersDiv);
}

function searchForLongestShipImageName(modifiedDatasInput, SelectedDiv) {
  var max = modifiedDatasInput[0];
  for (var i = 0; i < modifiedDatasInput.length; i++) {
    if (parseInt(modifiedDatasInput[i].lengthiness, 10) > parseInt(max.lengthiness, 10)) {
      max = modifiedDatasInput[i];
    }
  }
  var maxImage = max.image;
  var maxImageDiv = createEmptyDivToTheSide().divToTheSide;
  maxImageDiv.className = 'ships-stats';
  maxImageDiv.innerHTML = `Image name of the longest ship:  ${maxImage}`;
  SelectedDiv.appendChild(maxImageDiv);
}

// ! 7. feladat
function sortByModelNames(modifiedDatasInput) {
  var userDatasByModel = modifiedDatasInput.slice();
  var change;
  var i = userDatasByModel.length - 1;
  while (i > 0) {
    change = 0;
    for (var j = 0; j < i; j++) {
      if (userDatasByModel[j].model > userDatasByModel[j + 1].model) {
        [userDatasByModel[j], userDatasByModel[j + 1]] = [userDatasByModel[j + 1], userDatasByModel[j]];
        change = j;
      }
    }
    i = change;
  }
  return userDatasByModel;
}

function createSearchEvent(modifiedDatasInput) {
  var userDataModels = sortByModelNames(modifiedDatasInput);
  document.querySelector('#search-button').addEventListener('click', function event() {
    searchForModels(userDataModels);
  });
}

function searchForModels(userDataModels) {
  var searched = (document.querySelector('#search-text').value).toLowerCase();
  var found = false;
  var i = 0;
  while (i < userDataModels.length && !found) {
    if (userDataModels[i].model.toLowerCase().indexOf(searched) > -1) {
      found = true;
      putToTheSideDivFound(userDataModels[i]);
    }
    i++;
  }
  if (!found) {
    putToTheSideDivNotFound();
  }
}

function putToTheSideDivFound(modifiedDatasInput) {
  deletePreviousDivFromTheSide();
  var myDiv = createEmptyDivToTheSide().divToTheSide;
  var sideDiv = createEmptyDivToTheSide().sideDiv;
  var content = '';
  for (const k in modifiedDatasInput) {
    if (modifiedDatasInput.hasOwnProperty(k)) {
      content += `${k}: ${modifiedDatasInput[k]} <br>`;
    }
  }
  myDiv.innerHTML = content;
  displayFoundShipImage(myDiv, modifiedDatasInput);
  sideDiv.appendChild(myDiv);
}

function displayFoundShipImage(myDiv, modifiedDatasInput) {
  var foundImage = document.createElement('img');
  foundImage.src = `/img/${modifiedDatasInput.image}`;
  foundImage.alt = `${modifiedDatasInput.model}`;
  myDiv.appendChild(foundImage);
}

function putToTheSideDivNotFound() {
  deletePreviousDivFromTheSide();
  var myDiv = createEmptyDivToTheSide().divToTheSide;
  var sideDiv = createEmptyDivToTheSide().sideDiv;
  myDiv.innerHTML = '<img src=\'../img/notFound.png\' class="image-not-found"/>';
  sideDiv.appendChild(myDiv);
}

function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function onReadyStateChange() {
    // ? ide belenyúltam az ESLINT miatt, 2 == helyett 3 === lett.
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  var userDatas = JSON.parse(xhttp.responseText)[2].data;
  // Innen lehet hívni.
  deleteConsumablesNullObjects(userDatas);
  replaceNullsWithUnknown(userDatas);
  var modifiedDatas = mergeUnknowsWithSortedNumbers(userDatas);
  insertPicturesAfterAlphabetN(modifiedDatas);
  var spaceshipList = document.querySelector('.spaceship-list');
  createContentToHTML(modifiedDatas, spaceshipList);
  searchForCrew1Ships(modifiedDatas, spaceshipList);
  searchForBiggestCargoCapacity(modifiedDatas, spaceshipList);
  sumAllPassengers(modifiedDatas, spaceshipList);
  searchForLongestShipImageName(modifiedDatas, spaceshipList);
  createSearchEvent(modifiedDatas);
  addEvents();
}
getData('/json/spaceships.json', successAjax);
