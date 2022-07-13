Docs: https://docs.google.com/document/d/1rdMLVTHHEXHw3rew1gCGUJcBVt8aDYwczqc-wJMLKLE

# Project: Animal Shelter

## Requirement 
The local animal shelter needs a list of animals available for adoption. The animal types: they have are cats, dogs, and rabbits. Each type has its own color that represents the category of animals. There should be a navigation or filter, so it’s possible to only see one type of animal in the list.
Each list item should display the animal’s name, animal type, a color representing the animal type, and link to the animal’s profile page.
The profile page should contain the name, type, color, age, and the adoption cost, which depends on whether the animals have been treated by the vet, and how old they are.


## High level technical solution
We would store the animals and their types in a relational database. The backend service would provide an API for fetching the animals. As this is public data and the requirements don't state any login necessary we won’t use any authentication for the endpoint. Later this can be extended upon demand.

For the frontend we would call the API endpoint, load the response data into memory and display it to the user. Filtering should take place on the frontend as does the “color” assignment for the animals as that’s a frontend related matter.

In-depth technical solution
We would use Heroku as a hosting platform as that provides a great experience for maintenance and saving expensive development time on not building infrastructure is good for such a small project. For this we would rent a Postgres DB and 2 nodes (to maintain better uptime, as one node can go down and the other still responds to request as the load balancer takes care of that automatically, ex: during a deploy)



### **Database structure**

![alt text](https://i.ibb.co/BjdhLxt/db-tables.png)

- created_at timestamps for types and animals: This provides a more long-term solution in case any need arises to delete obsolete animals from the system or promote certain animals / types to customers. Easy to implement now, and a lot harder later down the line if we would need it.
- age / treated field: As the cost of the animal can be calculated from these two fields, storing the cost is redundant. Also later down the line promotions and discounts can be implemented a lot easier this way.
- color as free form text: As animals can be a lot more colorful than a single enum could hold we would use a free form text to describe it exactly right.

#### **Backend**
Backend would be written in Node.JS and use Express as a web framework. It would provide a single endpoint where all animals can be queried with their types: GET /animals. This is the fastest way to implement it and won’t cause any issues until there will be a lot more animals. Later down the line we could implement pagination for the API with type as a filter parameter but for an MVP this might be a nice shortcut. Cost calculations would happen on the backend as well, creating a function which calculates the price of an animal.
Example response would be: JSON.stringify([{ name: “Bruce”, type: “dog”, “color”: “black”, age: 5, treated: true, cost: 50 }])

#### **Frontend**
Frontend would be written in VueJS and hosted on Heroku. It would display a spinner or other loading screen (as the UX / UI team deems fit) while it loads the data initially from the backend. There would be a map with animal types and matching colors for the UI.
We would create a Single Page App with two pages:
/list - List of the animals would be here (might even add some router params to make the query sharable like /list?type=cat)
/profile/:id - Profile for a specific animal
A simple tracking would be implemented as well to track user interactions and decide the future direction of development. 


## Technology stack
### Backend
- NodeJS - Language
- Express - Web framework
- Mocha / Chai / Sinon / supertest - Testing “framework”
- node-postgres - DB connector library
### Frontend
- VueJS + Pinia - Frontend framework
- axios - for making http requests
- Vite - Testing

There would be some more basic packages like eslint, nodemon, and such.

## Testing
Apart from unit tests, we would create E2E tests using Cypress for most common use-cases such as filtering the list page for certain types and displaying the profile page when clicking on a specific animal.

## Resources used / Cost estimates
- 2 backend nodes on Heroku ($25 / ea / month)
- Postgres DB ($50 / month)



