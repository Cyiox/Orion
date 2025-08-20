# Book Visual Processing App  

## Todo

- Currently, a call to Gemini is made every time an image is selected on the gallery. AI's image analysis should be saved and attached to the photo in order to improve speed and reduce API calls.
- Separate the current gallery into two gallery sections. (Serials & Verso)
- Add Serial or Verso indicated into the picture page on the camera page
- Add an export feature to transcribe data into a CSV file. (**High Priority**)

## About

This project aims to extract metadata from a photo of a book, and import that information into a spreadsheet for further use. It is designed spefically to anaylize either the Verso of a book (The first page that features the ISBN), or libray assigned spine labels of a book. The format of the information provided will change accordlingly for both options. (For example, A verso analysis  will feature the ISBN, but the spine label will not.). The spreadsheet will either be exported into the phone's file system, or the user can sign into via google to export the spreadsheet directly into Google Sheets.

## Usage 

**For General Use**

1. Start from the gallery page (The app is opened on this page)
2. Enter the camera tab located on the bottom right side
3. Select Verso or Spine Label
4. Take a clear picture of the totality of the book's verso/Spine Label.
5. Confirm and repeat for the rest of the books
6. Once finished, Go back to the gallery and make sure you are in the correct gallery (Either Verso or Spine Label)
7. All New photos are automaticlly selected. Verify your selection and press export
8. Either export via Google docs or onto the phone directly.
9. Keep in mind that the LLM used for image anaylsis can make mistakes. Each item has a attached confindence level, for Items under 90 % confidnece it is recommended to verify the information. 



## For future devlopers

This project was created using the React Native framework, Expo bundler,  and primarly the Typescript language. The github respiratory link is:
https://github.com/Cyiox/Orion

Every file within the "App" directory is commented, however they are a few additional things to note.

In order to test the project on your own device, you need to install the following packages via NPM

- react-native-safe-area-context
- @google/genai
- expo-router
- expo-camera
- @react-native-async-storage/async-storage
- expo-file-system

Run the command `npm install <Package Name>` in order to install all of them.

Currently the code is only compatable with Google made LLMs, the model of which can be changed in the photoview.tsx file on line 41. In the future models from different company's  can be used  by implementing  the OpenAI API instead of googles own

In a effort to not expose my API key to the world, I have enclosed inside of a backend


