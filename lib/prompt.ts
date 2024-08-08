import { TripDetailsType } from './schema';

export function buildUserPrompt(tripDetails: TripDetailsType) {
  let persona = '';
  let isGroup = false;
  if (!tripDetails.numberOfAdults)
    throw new Error('Number of adults is required');

  if (tripDetails.numberOfAdults === 1) {
    persona = 'I am a single adult';
  } else {
    persona = `We are ${tripDetails.numberOfAdults} adults`;
    isGroup = true;
  }

  if (tripDetails.numberOfChildren) {
    isGroup = true;

    if (tripDetails.numberOfChildren === 1) {
      persona += ' and 1 child';
    } else {
      persona += ` and ${tripDetails.numberOfChildren} children`;
    }
  }

  return `${persona} planning a trip to ${tripDetails.city} ${
    tripDetails.country
  }. 
   ${isGroup ? 'We are' : 'I am'} traveling between ${
    tripDetails.fromDate
  } and ${tripDetails.toDate}.
   ${
     isGroup ? 'We are' : 'I am'
   } interested in visiting ${tripDetails.attractions}.
   ${isGroup ? 'We are' : 'I am'} ${
    tripDetails.withCar ? "don't have a car" : 'have a car'
  }.
  ${
    tripDetails.hotel
      ? isGroup
        ? 'We are staying at ' + tripDetails.hotel + ' '
        : 'I am staying at ' + tripDetails.hotel + ' '
      : ''
  }
   and ${isGroup ? 'our' : 'my'} budget is ${tripDetails.budget}.
   Can you suggest some activities for me to do there?
   Please include the geolocation and the price of each activity.
   Be realistic and don't make up any activities that are not real.
   Make sure to create a plan for each day of ${
     isGroup ? 'our' : 'my'
   } trip and separate it by days.
   If it is possible to do more than one activity in a day, please include more activities on that day and set a schedule for the entire day.`;
}

export const systemPrompt = `You are a helpful trip advisor designed an amazing trip plan.
Please suggest some activities for the user to do there.
Include the geolocation and the price of each activity.
Be realistic and do not make up any activities that are not real.
Make sure to create a plan for each day of the trip and separate it by days.
Format the markdown as follows:
## DATE
**Activity Name**: Activity Name \n\r
**Description**: Activity Description \n\r
**Start Time**: Activity Start Time \n\r
**End Time**: Activity End Time \n\r
**Price**: Activity Price in $ \n\r
**Address**: Activity Address \n\r
**Geolocation**: Latitude, Longitude \n\r

Don't give any interactions or greetings, just give the trip plan.
Include the date at the top of each day. keep it in the format DD-MM-YYYY.
Notice the requested date range and make sure to include activities for each day.
Make sure to include at least one activity for each day.

Add a separator line before every new date except the first one.
Add a another empty line before every new activity except the first one.
Break the line after every bullet.
for each date, generate a link to google maps with all the interest points for that day on it including the hotel.
Make sure to add a pin for each activity on the map and the hotel.
Make sure to verify that the map url is true and working.`;
