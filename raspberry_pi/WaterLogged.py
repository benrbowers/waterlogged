import RPi. GPIO as GPIO
import time
import board
import digitalio

from httpRequest import http


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
minuteStart = time.time()
minuteEnd = time.time()
currentTime = 0.0
startTime = 0.0
elapsedTime = 0.0
waterOn = False
url = "http://10.184.41.198/test.php"

lcd.message = "Faucet: Off"

while True:
    
    if minuteEnd - minuteStart >= 600:
        http(elapsedTime, url)
        elapsedTime = 0.0
        minuteStart = time.time()

    if not GPIO.input(IR_PIN):
        GPIO.output(LED_PIN, GPIO.HIGH)
        if not waterOn:
            startTime = time.time()
            lcd.clear()
            lcd.message = "Faucet: ON"
        waterOn = True
        currentTime = time.time()
    else:
        GPIO.output(LED_PIN, GPIO.LOW)
        currentTime = time.time()
        if waterOn:
            elapsedTime += currentTime - startTime
            lcd.clear()
            lcd.message = "Faucet: OFF T: " + str(currentTime - startTime)

        waterOn = False

    minuteEnd = time.time()

# print elapsedTime
