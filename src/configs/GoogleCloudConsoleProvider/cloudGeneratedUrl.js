import { Storage } from "@google-cloud/storage";
import { Buffer } from "buffer";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const keyFilename = path.join(
          __dirname,
          "../../configs/GoogleCloudConsole/nifty-depth-407105-b5748dc77282.json"
);
const storage = new Storage({ keyFilename });

const bucketName = "gravita-oasis-lms";

export const urlProvider = async (fileBuffer, fileName) => {
          try {
                    // console.log("Entered here for the 1st time")
                    const file = await storage.bucket(bucketName).file(fileName);

                    // Upload the buffer to Google Cloud Storage
                   await file.save(fileBuffer, (err) => {
                              if (err) {
                                        console.error("Error uploading the file:", err);
                                        throw err; // terminate execution on error
                              } else {
                                        console.log("Thumbnail  has been uploaded successfully!");
                              }
                    });

                    // console.log("before promise")
                    // // Wait for the file to be uploaded
                    // await new Promise((resolve) => file.on("finish", resolve));


                    // Make the file publicly accessible
                    // await file.makePublic();

                    // Get the public URL
                    const publicUrl = `https://storage.googleapis.com/${bucketName}/${file.name}`;

                    const wrappedDetails = {
                              publicUrl,
                    };
                    return wrappedDetails;
          } catch (error) {
                    console.error("Error inside this", error);
                    return 0;
          }
};
