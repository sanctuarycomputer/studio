# CSS Grid Layout

## Introduction
CSS Grid Layout is the most powerful layout system available in CSS. It is a 2-dimensional system, meaning it can handle both columns and rows, unlike flexbox which is largely a 1-dimensional system. You work with Grid Layout by applying CSS rules both to a parent element (which becomes the Grid Container) and to that element's children (which become Grid Items).

## Browser Support
![image](https://user-images.githubusercontent.com/30321742/60737608-69dbd180-9f29-11e9-9c3c-084a92aac71c.png)

https://caniuse.com/#search=css%20grid%20layout

## Terminology
- ### Grid Container
  The element on which ```display: grid``` is applied. It's the direct parent of all the grid items. 
- ### Grid Item
  The children (direct descendants) of the grid container. 
- ### Grid Line
  The dividing lines that make up the structure of the grid. They can be either vertical ("column grid lines") or horizontal ("row grid lines") and reside on either side of a row or column. 

  ![image](https://user-images.githubusercontent.com/30321742/60967826-94db7200-a2e9-11e9-9f07-4ff8edc8f43e.png)

- ### Grid Track
  The space between two adjacent grid lines. You can think of them like the columns or rows of the grid. 

  ![image](https://user-images.githubusercontent.com/30321742/60967841-a58be800-a2e9-11e9-81fc-f1bd708c6ce1.png)

- ### Grid Cell
  The space between two adjacent row and two adjacent column grid lines. It's a single "unit" of the grid.

  ![image](https://user-images.githubusercontent.com/30321742/60967871-bb011200-a2e9-11e9-9328-bd1f562aeb60.png)

- ### Grid Area
  The total space surrounded by four grid lines. A grid area may be comprised of any number of grid cells. 

  ![image](https://user-images.githubusercontent.com/30321742/60967897-c94f2e00-a2e9-11e9-98ee-0761abc9c371.png)

