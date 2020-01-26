import RPi. GPIO as GPIO
import time
import board
import digitalio

from httpRequest import httpPOST, httpGetToken


# LCD Setup
lcd_rs = digitalio.DigitalInOut(board.D26)
lcd_en = digitalio.DigitalInOut(board.D19)
lcd_d7 = digitalio.DigitalInOut(board.D27)
lcd_d6 = digitalio.DigitalInOut(board.D22)
lcd_d5 = digitalio.DigitalInOut(board.D24)
lcd_d4 = digitalio.DigitalInOut(board.D25)

lcd_columns = 16
lcd_rows = 2

import adafruit_character_lcd.character_lcd as characterlcd
lcd = characterlcd.Character_LCD_Mono(lcd_rs, lcd_en, lcd_d4, lcd_d5, lcd_d6, lcd_d7, lcd_columns, lcd_rows)


LED_PIN = 23
IR_PIN = 18

# Pin Setup
GPIO.setmode(GPIO.BCM)
GPIO.setup(LED_PIN, GPIO.OUT)
GPIO.setup(IR_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)

# Initial State for LED:
GPIO.output(LED_PIN, GPIO.LOW)


# Initializing variables:
minuteStart = time.time() #Keeps track of start of minute
minuteEnd = time.time() #Time after start of minute
currentTime = 0.0 #Current time
startTime = 0.0 #Time water started running
elapsedTime = 0.0
waterOn = False

#Get token and other data:
httpGetToken()
f = open("userdata.txt")
f.readline()
f.readline()
appliance = f.readline()
f.close()

lcd.message = "Water: Off"

while True:

    if minuteEnd - minuteStart >= 60:
        httpPOST(elapsedTime)
        elapsedTime = 0.0
        minuteStart = time.time()

    if not GPIO.input(IR_PIN):
        GPIO.output(LED_PIN, GPIO.LOW)
        if not waterOn:
            startTime = time.time()
            lcd.clear()
            lcd.message = appliance + ": ON"
        waterOn = True
        currentTime = time.time()
        elapsedTime += currentTime - startTime
    else:
        GPIO.output(LED_PIN, GPIO.HIGH)
        currentTime = time.time()
        if waterOn:
            lcd.clear()
            lcd.message = appliance + ": OFF\nUsed for: " + str(int(currentTime - startTime)) + " sec"

        waterOn = False

    minuteEnd = time.time()

# print elapsedTime
