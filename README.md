
# Herzlich Willkommen

Dieses Geoinformationssystem (GIS) wurde im Rahmen des Aufbaumoduls 2 des Instituts für Digital Humanities der Universität zu Köln erstellt.

Ziel dieses Projektes ist die Darstellung von Zeit innerhalb von Geoinformationssystemen. Mittels eines Trial and Error Verfahrens wurden sukzessiv vier unterschiedliche Darstellungen entwickelt. Grundlage ist das Thema "Besucheraufkommen der Gaststätten in Ehrenfeld". Dafür wurden die Daten der Freitage und Samstage des gesamten Jahres von vier Gaststätten gesammelt: Heinz Gaul, Club Bahnhof Ehrenfeld, Artheater und Helios 37. Die Datenbank wurde selbstständig erstellt. Die Daten entstammen den zugehörigen Facebook-Veranstaltungen und sind somit nicht akkurat.

Das GIS wurde mit JavaScript und der ArcGIS-API realisiert. Für das Layout wurde Bootstrap verwendet.

Für die  [Balkendarstellung](https://github.com/dsteige1/digitale_karten/blob/master/html/balken.html)  wurde ein Slider erstellt, der die Anzahl der Veranstaltungen (Y-Achse) des jeweiligen Tages (X-Achse) plottet. Mit einem Hover über den Slider werden die Veranstaltungen eingezeichnet.

Die  [Animation](https://github.com/dsteige1/digitale_karten/blob/master/html/timer.html)  zeichnet die einzelnen Veranstaltungen des jeweiligen Tages in regelmäßigem Abstand. Mit einem Regler kann die Geschwindigkeit verändert werden.

In der  [Graphdarstellung](https://github.com/dsteige1/digitale_karten/blob/master/html/graph.html) wird ebenfalls ein Slider verwendet, doch dieses Mal wurde ein Liniendiagramm erstellt, der den durchschnittlichen Eintrittspreis des Tages in Bezug zur Zeit zeichnet.

In unserer [Farbdarstellung](https://github.com/dsteige1/digitale_karten/blob/master/html/color.html) steuern verschiedene Ausprägungen die Intensität der Farben der Punkte auf der Karte. Hier kann man wählen, ob die Anzahl der Teilnehmenden oder der durchschnittliche Eintrittspreis des Tages visualisiert werden soll.

© David Steiger, Alexandra Petersen und Ibrahim Tuna
