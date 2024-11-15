import fingerprintRepo from "@/app/repo/fingerprint-repo";

import { SerialPort } from "serialport";

export async function POST(request, { params }) {
  const { userId } = await params;
  const user = await request.json();
  console.log("In finger print route", userId, user);

  const arduinoPort = new SerialPort({
    path: "/dev/cu.usbmodem11101",
    baudRate: 57600,
  });
  console.log("Arduino port:", arduinoPort.isOpen);

  try {
    if (arduinoPort.isOpen) {
      arduinoPort.write(`SIGNUP:${userId}\n`, (err) => {
        if (err) {
          console.error("Error sending data to Arduino:", err);
          return Response.json(
            { error: "Error communicating with Arduino" },
            { status: 500 }
          );
        } else {
          console.log(
            `User ID ${userId} sent to Arduino for fingerprint enrollment.`
          );
        }
      });
    } else {
      console.error("Arduino serial port is not open.");
      return Response.json(
        { error: "Arduino serial port is not open" },
        { status: 500 }
      );
    }

    arduinoPort.on("data", async (data) => {
      const responseFromArduino = data.toString();

      if (responseFromArduino.includes("SIGNUP_SUCCESS")) {
        console.log("Fingerprint enrolled successfully.");

        try {
          fingerprintRepo.addFingerprint({ userId: userId, user: user });

          return Response.json(
            { message: "Fingerprint enrolled successfully." },
            { status: 201 }
          );
        } catch (error) {
          console.error("Error saving fingerprint data:", error);
          return Response.json(
            { error: "Error saving fingerprint data" },
            { status: 500 }
          );
        }
      } else if (responseFromArduino.includes("SIGNUP_FAIL")) {
        console.log("Fingerprint enrollment failed.");
        return Response.json(
          { error: "Fingerprint enrollment failed" },
          { status: 400 }
        );
      }
    });
  } catch (error) {
    console.error("Error during enrollment process:", error);
    return Response.json(
      { error: "An error occurred during the fingerprint enrollment process" },
      { status: 500 }
    );
  }
}
