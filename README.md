# Consultant Connect Developer Test

## Install and run

```bash
     $ yarn start
```

If you don't have (or like!) yarn, I hope it'll be obvious what to do/change.

Note - no need to "install" as the above checks for that.

Listens on `http://localhost:4200`

## Web API

Assumes the associated Flask/Twilio server is up and running on port 5000. There is a script `run-flask.sh` to help, reading settings from a `.env`. This is not needed by default, as the service is mocked - see below.

The app uses `proxy.conf.json` to configure this.

## Notes

1. Only tested on Chrome (latest, Linux). The only thing that makes me slightly nervous is the drag'n'drop CSV upload (with no classic file-upload option).

1. By default, the UI uses a mock API, which can easily handle many thousands of rows, e.g., in the enclosed `data*.csv`. To switch to the real API, comment out the provider override in `app.modules.ts`. Note that the mock API returns random "fails".

1. There is a test file `twiliotest2.csv`, using values suitable with Twilio test credential (free, yay!).

1. No example CSV was provided so I've assumed `name=col1`, `phone=col6`. Easy to change in `home.component.ts(loadData)`. See also `make_data.js`.

1. I didn't encounter the problem in the original python that needed a 250ms delay between requests, but then again I didn't poke a large number of the latter.

1. I think some of my sending logic is wrong. If a send fails, it can be resent on the next try. This may be wrong, especially without checking specific error codes. See also NOTES.md.

1. NO TESTS!

1. Quite a bit of error checking is lacking. What's new, eh?

1. There's no auth. I considered fronting with Apache + Basic Auth, but ran out of time.

1. I had hoped to be able to do the whole thing as docker-compose cluster (including angular/yarn) but ran out of time.

1. Rather horrible UI/UX. The responsiveness starts to fail on small devices.

1. Big UI fail if the number of duplicates is large.

1. I would like an extra tab "Test" so user can send herself a message to validate formatting, etc, before bulk send.

1. I didn't add an explicit "search" on the table. It does exist - that's how the "duplicates" works, so would be trivial to implement.

## Other task notes

See NOTES.md
