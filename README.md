# snow-on-me-snap
A simple nodejs webserver serving christmas snow on demand and showing up configure snap options

## Setup your rpi2/3

1. Install [ubuntu core](https://developer.ubuntu.com/en/snappy/) on your raspberry Pi.
1. Install this webserver snap: `sudo snap install snow-on-me`
1. Install the oxide fullscreen webview: `sudo snap install oxide-digitalsignage --devmode --channel=beta`
1. Change boot configuration file and give it enough GPU RAM for displaying web pages: `sudo mount -o remount,rw /boot/uboot`
1. Edit `/boot/uboot/config.txt` and add one line:
```
gpu_mem=448 
```

Then reboot.


## Launching it

You can launch your local webserver directly on the pi (once connected to a display):
```
/snap/bin/oxide-digitalsignage.start-oxide --url="http://localhost"
```

Note that you can as well accessing the webserver from another browser on another machine using the IP of your Pi.


## Configure port and title

You can configure the port and web page title via the snap configure hook.

This one is executing on install and upgrade, and you can change parameters with:
```
snap set snow-on-me port=8080 title="Don't catch a cold with that snow"
```

Of course, you can set only one of those parameters. They will be picked up by the nodejs daemon and refreshed automatically.
You will need to refresh the page in your browser.
