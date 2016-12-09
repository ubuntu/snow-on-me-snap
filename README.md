# snow-on-me-snap
A simple nodejs web server serving christmas snow on demand and an example of a configurable snap module

## Setup your rpi2/3

1. Install [ubuntu core](https://developer.ubuntu.com/en/snappy/) on your raspberry Pi.
1. Install this web server snap: `sudo snap install snow-on-me`
1. Install the oxide fullscreen webview: `sudo snap install oxide-digitalsignage --devmode --channel=beta`
1. Change boot configuration file and give it enough GPU RAM for displaying web pages: `sudo mount -o remount,rw /boot/uboot`
1. Edit `/boot/uboot/config.txt` and add one line:
```
gpu_mem=448 
```

Then reboot.


## Launching it

The web server will be launched automatically as a nodejs service when your PI starts.

You can launch a full screen web browser directly on the pi (once connected to a display) and connect it to this webserver:
```
/snap/bin/oxide-digitalsignage.start-oxide --url="http://localhost"
```

Note that you can also access the web server from a browser on another machine using the IP of your Pi.


## Configure port and title

You can configure the port and web page title via the snap configure hook.

This one is executing on install and upgrade, and you can change parameters with:
```
snap set snow-on-me port=8080 title="Don't catch a cold with that snow"
```

Of course, you can set just one of those parameters if you like. They will be picked up by the nodejs daemon and refreshed automatically.
You will need to refresh the page in your browser.
