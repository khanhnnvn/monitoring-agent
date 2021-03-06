# Monitoring Agent

Linux Dash monitoring agent for servers.

**To install Linux Dash, Please see [linux-dash/cli](https://github.com/linux-dash/cli)**

## Description

This tool contains a node server which is open to websocket connections from Linux Dash Service (LDS). It also periodically reports server status to LDS. 

The agent is an internal depedency and should not be directly installed.

**Linux Dash Service:** Refers to a publicly accessible subset of Linux Dash API endpoints.

## Requirements

When starting the monitoring agent, a User Access Key is required via ```--user-access-key [key]``` flag

Example:

```sh
node linux-dash-monitor.js --user-access-key ABC-123-456
```

## Settings

Settings may be updated via ```config.json``` in the root directory of the monitoring agent module.

They may also be updated via flags

```
node linux-dash-settings.js --update [key] [value]
```

**List of Setting Defaults**

Key | Default | Description
------------ | ------------- | -------------
PORT | 8080 | Server port on which linux dash node server listens for connection requests from LDS
ET_INTERVAL | 60000 | Interval in milliseconds at which the monitoring agent *phones home* to LDS


## LDS Endpoints

Name | Method | Endpoint
------------ | ------------- | -------------
VALIDATE_USER | POST | ```/user/:userId/servers```
ADD_SERVER | POST | ```/user/:userId/servers/```
UPDATE_SERVER | PUT | ```/user/:userId/servers/:serverId```
DELETE_SERVER | DELETE | ```/user/:userId/servers/:serverId```


## Architecture

- [x] Upon starting, the agent
	- [x] validates User Access Key via **LDS:VALIDATE_USER**
	- [x] registers Server via **LDS:ADD_SERVER**
		- [x] The serverId received as response is stored in process env.	
- [x] At **Settings:ET_INTERVAL**, the agent reports the following to **LDS:UPDATE_SERVER**`:
	- [x] RAM utilization
	- [x] CPU utilization
	- [x] Uptime
- [x] Upon exiting (error or stop), the agent
	- [x] Server is de-registered via **LDS:DELETE_SERVER**
- [ ] Upon a websocket connection from LDS, the monitoring agent begins to stream all available system stats to the originating dashboard
- [ ] Replace legacy python modules with JS streams 
	- speedtest
- [ ] Remove legacy module config
- [ ] Remove internet speed module (sh)