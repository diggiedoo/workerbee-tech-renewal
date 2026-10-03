# WorkerBee Tech Renewal

## Run on your local network

From this folder, start the static site server:

```powershell
python server.py
```

The server listens on all network interfaces on port `8000`. Open
`http://localhost:8000` on this computer. Other devices on the same Wi-Fi or
LAN can open `http://<this-computer-LAN-IP>:8000`. Find the LAN IP with
`ipconfig` on Windows or `hostname -I` in WSL/Linux.

If Windows Firewall prompts you, allow access on **Private networks only**.
If it does not prompt, an administrator can create a narrowly scoped inbound
rule for port 8000 from local-subnet devices by running this in an elevated
PowerShell window. The rule is limited to nearby devices even when Windows
classifies the current network as Public:

```powershell
New-NetFirewallRule -DisplayName "WorkerBee LAN site (TCP 8000)" `
  -Direction Inbound -Action Allow -Protocol TCP -LocalPort 8000 `
  -Profile Any -RemoteAddress LocalSubnet
```

Stop the server with Ctrl+C when it is no longer needed.

The server is a simple static-file preview server. It does not process or
deliver estimate form submissions; the demo form only prepares a request for
the visitor to copy.

## Public access

The server listens on the LAN interface, so a router can technically forward
an external TCP port to this computer's port 8000. **Do not expose this
development server directly to the public internet.** It has no HTTPS,
authentication, production hardening, or request protections. A safer public
launch uses a production static host with HTTPS, or a maintained reverse proxy
with HTTPS and only the site files exposed. Port forwarding also requires a
publicly reachable IP address; some ISPs use CGNAT, which prevents ordinary
inbound port forwarding.
