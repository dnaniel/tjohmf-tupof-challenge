export const fetchSteps = async () => {
  const response = await fetch('https://uqnzta2geb.execute-api.us-east-1.amazonaws.com/default/FrontEndCodeChallenge');
  
  if(response.status >= 400) {
    throw(new Error('Error fetching steps'));
  } else {
    let filteredArray = [];
    let jsonResponse = await response.json();

    jsonResponse.forEach((obj) => {
      obj.versionContent.sort((a,b) => { // get latest effective content
        return new Date(b.effectiveDate) - new Date(a.effectiveDate);
      })

      let filteredObject = {
        stepNumber: parseInt(obj.stepNumber),
        title: obj.versionContent[0].title,
        body: obj.versionContent[0].body
      }

      filteredArray.push(filteredObject);
    });

    filteredArray.sort((a,b) => { // sort by stepNumber
      return a.stepNumber - b.stepNumber;
    });

    return filteredArray;
  }
}