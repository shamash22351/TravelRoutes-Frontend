import React, { useState } from 'react';
import JSZip from 'jszip';

const exportToGPX = (locations) => {
  const gpxHeader = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="YourApp">
`;
  const gpxFooter = `</gpx>`;
  const gpxPoints = locations.map(loc => `
  <wpt lat="${loc.lat}" lon="${loc.lng}">
    <name>${loc.name}</name>
  </wpt>`
  ).join('');

  const gpxData = gpxHeader + gpxPoints + gpxFooter;
  const blob = new Blob([gpxData], { type: 'application/gpx+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'export.gpx';
  a.click();
  URL.revokeObjectURL(url);
};

const exportToKML = (locations) => {
  const kmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
<Document>
<name>Export</name>
`;
  const kmlFooter = `</Document></kml>`;
  const kmlPoints = locations.map(loc => `
  <Placemark>
    <name>${loc.name}</name>
    <Point>
      <coordinates>${loc.lng},${loc.lat}</coordinates>
    </Point>
  </Placemark>`
  ).join('');

  const kmlData = kmlHeader + kmlPoints + kmlFooter;
  const blob = new Blob([kmlData], { type: 'application/vnd.google-earth.kml+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'export.kml';
  a.click();
  URL.revokeObjectURL(url);
};

const exportToKMZ = async (locations) => {
  const zip = new JSZip();
  const kmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
<Document>
<name>Export</name>
`;
  const kmlFooter = `</Document></kml>`;
  const kmlPoints = locations.map(loc => `
  <Placemark>
    <name>${loc.name}</name>
    <Point>
      <coordinates>${loc.lng},${loc.lat}</coordinates>
    </Point>
  </Placemark>`
  ).join('');
  const kmlData = kmlHeader + kmlPoints + kmlFooter;

  zip.file("export.kml", kmlData);
  
  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'export.kmz';
  a.click();
  URL.revokeObjectURL(url);
};

const ExportComponent = () => {
  const [locations, setLocations] = useState([
    { lat: 55.751244, lng: 37.618423, name: 'Location 1' },
    { lat: 59.934280, lng: 30.335099, name: 'Location 2' }
  ]);

  return (
    <div>
      <h1>Экспорт данных</h1>
      <button onClick={() => exportToGPX(locations)}>Экспорт в GPX</button>
      <button onClick={() => exportToKML(locations)}>Экспорт в KML</button>
      <button onClick={() => exportToKMZ(locations)}>Экспорт в KMZ</button>
    </div>
  );
};

export default ExportComponent;