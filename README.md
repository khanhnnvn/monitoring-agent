# Monitoring Agent

Linux Dash monitoring agent for servers.

## Description

This tool contains a node server which is open to websocket connections from Linux Dash Service (LDS). 

**Linux Dash Service:** Refers to a publicly accessible subset of Linux Dash API endpoints.

## Requirements

When starting the monitoring agent, a User Access Key is required via ```--user-access-key [key]``` flag

Example:

```sh
node linux-dash-monitor.js --user-access-key ABC-123-456
```

## Defaults

Settings may be updated via ```config.json``` in the root directory of the monitoring agent module.

They may also be updated via flags

```
node linux-dash-settings.js --update [key] [value]
```

Key | Value | Description
------------ | ------------- | -------------
PORT | 8080 | Server port on which linux dash node server listens for connection requests from LDS
ET_INTERVAL | 60000 | Interval in milliseconds at which the monitoring agent *phones home* to LDS


## Architecture

- [ ] Upon starting, the agent
	- [ ] validates User Access Key against LDS
	- [ ] registers Server via LDS ```POST /user/:userId/servers```
		- [ ] The serverId received as response is stored locally	
- [ ] Upon exiting (error or stop), the agent
	- [ ] Server is de-registered via LDS ```DELETE /user/:userId/servers/:serverId```
- [ ] At a set interval (Settings:ET_INTERVAL), the agent reports the following to LDS:
	- [ ] RAM utilization
	- [ ] CPU utilization
	- [ ] Uptime
	- [ ] Public IP
- [ ] Upon a websocket connection from LDS, the monitoring agent begins to stream all available system stats to the originating dashboard