import RPi. GPIO as GPIO
import time

LED_PIN = 23
IR_PIN = 18

# Pin Setup
GPIO.setmode(GPIO.BCM)
GPIO.setup(LED_PIN, GPIO.OUT)
GPIO.setup(IR_PIN, GPIO.IN)

# Initial State for LED:
GPIO.output(LED_PIN, GPIO.LOW)


while True:
    if GPIO.output(IR_PIN):
        GPIO.output(LED_PIN, GPIO.HIGH)
        startTime = time.time()
    else:
        GPIO.output(LED_PIN, GPIO.LOW)
        currentTime = time.time()


elapsedTime = currentTime - startTime
