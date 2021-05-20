import sys
import cv2

video = cv2.VideoCapture(0)

a=0

while True:
    a=a=1
    check, frame = video.read()

    gray=cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)

    cv2.imshow("capture",gray)

    key=cv2.waitKey(1)
    print(gray)

    if key==ord('q'):
        break

print(a)
video.release()
cv2.destroyAllWindows

print('PyTron says Python!')
sys.stdout.flush()