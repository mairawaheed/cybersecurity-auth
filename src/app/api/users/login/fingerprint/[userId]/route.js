import fingerprintRepo from "@/app/repo/fingerprint-repo";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

export async function POST(request, { params }) {
  const { userId } = await params;
  const user = await request.json();

  const arduinoPort = new SerialPort({
    path: "/dev/cu.usbmodem11201",
    baudRate: 19200,
  });
  const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: "\r\n" }));

  return new Promise((resolve, reject) => {
    try {
      arduinoPort.on("open", () => {
        console.log("Serial port opened.");

        setTimeout(() => {
          arduinoPort.write(`LOGIN:${userId}\n`, (err) => {
            if (err) {
              console.error("Error writing to Arduino:", err);
              reject("Error writing to Arduino");
            } else {
              console.log("Testing fingerprint...");
            }
          });
        }, 5001); // Wait for 5 seconds before sending the command
      });

      let responseBuffer = "";

      parser.on("data", async (data) => {
        const responseFromArduino = data.toString("utf-8");
        responseBuffer += responseFromArduino;
        console.log("Response from Arduino:", responseBuffer);

        if (responseBuffer.includes("LOGIN_SUCCESS")) {
          console.log("Fingerprint verified successfully.");
          try {
            await fingerprintRepo.verifyFingerprint({
              userId: parseInt(userId),
            });
            resolve(
              Response.json(
                { message: "Fingerprint verified successfully." },
                { status: 201 }
              )
            );
          } catch (error) {
            console.error("Error verifying fingerprint data:", error);
            resolve(
              Response.json(
                { error: "Error verifying fingerprint data" },
                { status: 500 }
              )
            );
          } finally {
            arduinoPort.close();
          }
        } else if (responseBuffer.includes("LOGIN_FAIL")) {
          console.log("Fingerprint verification failed.");
          resolve(
            Response.json(
              { error: "Fingerprint verification failed" },
              { status: 400 }
            )
          );
          arduinoPort.close();
        }
      });
    } catch (error) {
      console.error("Error during verification process:", error);
      resolve(
        Response.json(
          {
            error:
              "An error occurred during the fingerprint verification process",
          },
          { status: 500 }
        )
      );
      arduinoPort.close();
    }
  });
}
