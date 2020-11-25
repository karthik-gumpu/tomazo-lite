# ZOMATO _Lite_

This project is about zomato like simple restaturant searching.

---

## How to run?

Clone the repo and install the packages and run start command to start app

In the project directory, you can run:

`yarn` to install all packages\
`yarn start` to start app

---

## Tech and libraries used

- ReactJs
- Material UI
- Lodash
- Axios
- React Waypoint
- Bluebird
- Uuid

---

## Functionalities

**1. Location selection**

- System Prompts user to select location by default
- System caches selected location for next visit
- Provided ability to change location
- Type in input box to get suggestions

**2. Restarurants search**

- Two sections -> Basic, Adanced
- Provided option to switch between searches
- **Search By name**
- - Type name in input box, matching results shown in dropdown
- - Click on one result to view full details
    > Minimum one character required to search
- **Search By Category, Cuisines**

- - Select multiple cuisines, categories and
    click on search

- - Results will be shown in tiles

    > Click on search button directly without selecting any options, which returns all

    > There is no api to get all localities to show in dropdown in UI

**3. Restaurant Listing**

- Shows all matching results in tiles view

**4. Pagination**

- Scroll down to fetch more records
  > Defaults to 20 records

**5. Sorting**

- Provided option to sort on Cost and Rating in asc and desc order
  > API not providing filtering ability

**6. Restaurant details**

- Clicking on one restaurant tile, full deatils will be shown on modal popup

# Note

```
1. ZOMATO access key kept in inside code base, Later we can make it available from env file

2.
```
