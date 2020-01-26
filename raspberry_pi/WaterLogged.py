import RPi. GPIO as GPIO
import time
from httpRequest import http

LED_PIN = 23
IR_PIN = 18

# Pin Setup
GPIO.setmode(GPIO.BCM)
GPIO.setup(LED_PIN, GPIO.OUT)
GPIO.setup(IR_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)

# Initial State for LED:
GPIO.output(LED_PIN, GPIO.LOW)


# Initializing variables:
minuteStart = time.time()
minuteEnd = time.time()
currentTime = 0.0
startTime = 0.0
elapsedTime = 0.0
waterOn = False
url = "http://10.184.41.198/test.php"

while True:
    
    if minuteEnd - minuteStart >= 15:
        http(elapsedTime, url)
        elapsedTime = 0.0
        minuteStart = time.time()

    if not GPIO.input(IR_PIN):
        GPIO.output(LED_PIN, GPIO.HIGH)
        if not waterOn:
            startTime = time.time()
        waterOn = True
        currentTime = time.time()
    else:
        GPIO.output(LED_PIN, GPIO.LOW)
        currentTime = time.time()
        if waterOn:
            elapsedTime += currentTime - startTime

        waterOn = False

    minuteEnd = time.time()

# print elapsedTime
