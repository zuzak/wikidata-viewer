wikidata viewer
---------------

## Installation
```
git clone https://github.com/zuzak/wikidata-viewer
cd wikidata-viewer
npm install
npm start
firefox http://localhost:3000/
```
## Configuration
In ``config.json``:
```json
{
    "restrict": true,
    "write": false
}
```

* When ``restrict`` is true, only edits to the
  [Wikidata sandbox](https://www.wikidata.org/wiki/Q4115189) will be accepted.
  This is to ensure that faulty code won't go haywire!
* When ``write`` is false, no edits will be accepted.

When editing on a local installation, use
```json
{
    "restrict": false,
    "write": false
}
```
