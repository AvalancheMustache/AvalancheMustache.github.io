---
layout: post
title: Introduzione al progetto
date: 2014-04-10 12:00:00
categories: introduzione Alimonta Adriano
author: MatteoRagni
comments: true
commment_id: 20140410120000
file: 2014-04-10-Introduzione-al-progetto.markdown
---


<style>
table {
	margin: auto;
	padding: 10px;
	box-shadow: 0px 0px 5px 5px #111;
}

table td { 
	padding: 5px;
	padding-left: 10px;
	padding-right: 10px;
}

table thead tr {
	background-color: #111;
}

thead th {
	padding: 5px;
	padding-left: 10px;
	padding-right: 10px;
}

table tbody tr:nth-child(odd) { 
	background-color: #333; 
}

table tbody tr:nth-child(even) { 
	background-color: #444; 
}

</style>

# Incontro Adriano Alimonta
{:.no_toc}

 * contenuti
 {:toc}

## Introduzione al progetto

L'idea di base è quella di costruire un **drone in grado di identificare autonomamente persone sepolte in valanga**. La frase sottolineata è un po' da analizzare:

 * **drone**: dispositivo automatico elettrico in grado di sorvolare una zona. 

<img src="/assets/alimonta/Quadcopter.svg">

 * **volo autonomo**: il drone che abbiamo in mente deve essere autonomo, ovvero non richiedere personale qualificato che debba pilotarlo.
 * **identificare persone sepolte in valanga**: il dispositivo deve segnalare al personale di soccorso la _posizione più probabile_ di un sepolto. Per fare questo è necessario identificare delle strategie di ricerche _che possono essere anche diverse da quelle normalmente adottate dal soccorritore_ (Artva - Recco - Sondaggio - etc.)

Su questa base abbiamo ipotizzato una idea di quello che è il task primario del dispositivo.

## Rappresentazione della ricerca 

Quanto rappresentato nel seguente schema è assolutamente preliminare e rappresenta una ipotesi di possibile sviluppo. Richiede aggiornamenti, identificazione di strategie in caso di failure di parti del dispositivo, etc...

Questa pianificazione fa parte della seconda fase del progetto.

<img src="/assets/alimonta/diagramma1.svg" style="width: 50%">

Vogliamo approfondire con Adriano i seguenti aspetti:

 1. **Lancio sull'area di ricerca**
 2. **Lettura del segnale ARTVA**
 3. **Segnalazione ai soccorritori**
 4. **Richiesta di fine ricerca**
 5. **Ritorno al soccorritore**

**Per capire quali sono le migliori specifiche per il drone, abbiamo pensato di andare a disturbare chi il soccorso in valanga lo conosce bene: il [_Soccorso Alpino e Speleologico del Trentino_](http://www.soccorsoalpinotrentino.it/).**

### Lancio del drone

Il lancio del drone nell'area di ricerca dipende da diversi fattori. La possibilità di lancio si dovrebbe **inserire perfettamente in quella che è la strategia attuale di ricerca**. Sarebbe quindi giusto conoscere tale strategia.

Sulla base di questo, sarebbe possibile capire quale controllo è necessario per il rilascio del drone al fine di cominciare la ricerca. Il rilascio potrebbe avvenire dall'elicottero (quindi recupero di caduta libera o mediante verricello - in funzione delle normative ENAC) o da terra? Questa questione deve essere approfondita nella fase di sviluppo del progetto. Tale strategia potrebbe mostrarsi fondamentale **quando la squadra non può scendere sul fronte di valanga**, per eventuali condizioni meteo/sicurezza proibitive.

### Lettura del segnale ARTVA

La presenza dell'**ARTVA** sulle vittime è fondamentale, e nostra fonte principale di informazione sulla eventuale presenza di una/più vittime. **Diventa fondamentale consocere perfettamente i dispositivi ARTVA**, per definire:

 * eventuali interferenze sul segnale dovute alla elettronica del drone (soprattutto motori)
 * distanze alle quali sia possibile rilevare il segnale
 * tipologie di ARTVA a vostra disposizione e differenza tra ARTVA digitali e analogici

Inoltre dal _Manuale del Club Alpino Italiano 13 - SCI ALPINISMO (Maggio, 2004)_, sappiamo che le percentuali di ritrovamento mediante ARTVA sono relativamente basse (attorno a $$7$$%), contro una probabilità media del $$60$$% di essere sepolti completamente dal fronte di valanga. Si deve considerare che queste statistiche sono al netto delle operazioni di autosoccorso.

Le caratteristiche medie di un ARTVA sono le seguenti, da quanto risulta dalle nostre ricerche:

{% highlight text %}
Frequenza di emissione: 475 kHz (ordine CISA-IKAR '84)
Antenne: 1 Analog, 3 Digital
Peso: 200-400g
Alimentazione: 2xAA o 3xAAA
Durata in ricezione: circa 40h (consumi 5X rispetto TX)
Durata in trasmissione: circa 200h
Portata minima: da 15m a 80m
Temperatura esercizio: -20°C a +40°C
{% endhighlight %}

ARTVA analogico e digitale hanno la fondamentale differenza:

 * analogico: segnale trasformato in suono. Rapido ma richiede una certa capacità di utilizzo per identificare la direzione della vittima.
 * digitale: segnale elaborato dal microprocessore a bordo, cosa che porta ad un delay tra ricezione e indicazione al soccorritore (gli apparecchi di nuova generazione hanno comunque la possibilità di essere commutati in modalità analogica).

Il segnale trasmesso è uguale in entrambi i dispositivi, un impulso sulla frequenza standard.

La posizione della antenna implica il tipo di ricerca che può essere effettuata, nel caso di ricevitore analogico:

 * Antenna orizzontale: ricerca di tipo direzionale
 * Antenna verticale: ricerca non direzionale

Questo però dipende anche dalla posizione della vittima (che incide sulla coassialità delle antenne trasmittenti/riceventi).

### Segnalazione al soccorritore

Un altro importante punto da approfondire è la segnalazione al soccorritore della posizione più probabile della vittima. Esistono due tipologie di marking essenzialmente:

 * _marking software_: fornire una posizione GPS al soccorritore mediante un dispositivo del suo equipaggiamento (cellulare, tablet, etc.)
 * _marking hardware_: rilasciare qualcosa sul fronte di valanga che permetta di identificare visivamente la posizione del disperso

In secondo luogo si dovrebbe scegliere cosa deve fare il drone nel caso di identificazione della vittima: possiamo impostare la routine di ricerca in modo tale che stazioni sulla posizione più probabile trovata, oppure che dopo aver segnalato la vittima con il marking scelto continui per la vittima successiva.

### Richiesta di fine ricerca e ritorno

Alla fine del diagramma abbiamo la richiesta di fine ricerca e il ritorno al soccorritore, che richiede in qualche modo un dispositivo di comunicazione tra drone e soccorritore. Diventa quindi per noi fondamentale capire:

 * quali dispositivi hanno a disposizione i soccorritori
 * se i dispositivi sono adatti alla interfaccia con il drone (touchscreen e guanti)
 * se è necessario un dispositivo diverso, con tasti fisici e dedicato.

# Le risposte di Adriano

## Intervento in valanga

L'intervento inizia dalla chiamata del testimone, che solitamente è una persona che si trova sul fronte di valanga. Nella migliore delle ipotesi, il testimone **chiama il 118** e **inizia l'autosoccorso** con il proprio dispositivo ARTVA. Purtroppo, nella realtà e a causa dello shock, solitamente il testimone riesce ad eseguire solo una delle due operazioni. Le statistiche di persone aventi ARTVA non sono ancora sufficientemente confortanti.

Dal momento della chiamata parte la procedura stabilita in sinergia tra le diverse entità che si occupano dell'emergenza.
L'operatore del 118 esegue una intervista al testimone in modo tale da capire luogo e situazione generale. Nel frattempo viene contattato il soccorso alpino e l'elisoccorso per la gestione dell'intervento. Le unità presenti sull'eliambulanza pronta a partire per il fronte di valanga sono:

 * il tecnico dell'elisoccorso del soccorso alpino
 * unità cinofila del soccorso alpino
 * equipe sanitaria e infermiere

Questi sono i primi soccorsi che giungono al fronte di valanga. Durante tutta questa fase si valutano le condizioni meteo, per decidere se l'eliambulanza può raggiungere il fronte di valanga. I principali problemi riguardano nebbia e buio, che impongono l'abbandono del soccorso mediante eliambulanza in favore di un _soccorso classico_ da terra.

Arrivati sul fronte di valanga, c'è una valutazione della percentuale di pericolo residuo. Tale pericolo ci sarà sempre, ma il tecnico dell'elisoccorso decide se le condizioni permettano di scendere oppure no. Superata la valutazione si comincia immediatamente con la ricerca **udito, vista, ARTVA**. Tale ricerca è da effettuarsi con ARTVA in ricezione. L'unità cinofila nel frattempo libera il cane per la ricerca.

L'elicottero, dopo aver scaricato il primo gruppo di soccorritori, inizia a fare la spola per portare in zona soccorritori e attrezzature delle stazioni del soccorso alpino vicine.

In alcuni casi è possibile effettuare delle ricerche ARTVA anche dall'elicottero (ad esempio fronti di valanga di grandi dimensioni), ma c'è un evidente limite nelle capacità di effettuare questo tipo di ricerca dovuto alla dinamica dell'elicottero.

La curva media di sopravvivenza (considerando _assideramento e ipotermia_, senza contare eventuali traumi) ha un limite superiore attorno i $15..18^{min}$. Il soccorso alpino, soprattutto nel caso non possa fare affidamento sull'eliambulanza, potrebbe arrivare dopo tale periodo di tempo. Qui si sottolinea l'importanza dell'auto-soccorso. 

## Dispositivi in dotazione

Ovviamente c'è un obbligo morale, oltre che procedurale, nell'avere a disposizione l'ultima tecnologia possibile. Ciònonostante, non esiste uno standard di attrezzatura, che tende a variare da escursionista ad escursionista. In genere un ARTVA pesa tra i 200g e i 400g.

Principalmente si trovano modelli digitali, ma la differenza sostanziale tra i modelli digitali e analogici risiede nella elaborazione dei dati da parte di un microprocessore e nella portata del segnale in ricezione. Gli ARTVA analogici hanno una portata minima in ricezione sensibilmente più alta, mentre quelli digitali, a causa della dimensione di una delle antenne, tendono ad avere una portata minima sensibilmente inferiore. 

Di contro, gli ARTVA digitali eseguono una elaborazione del segnale in modo da dare una indicazione al soccorritore (o all'utente in generale) in termini visivi, oltre il classico `bip` della direzione più probabile in cui si trova il sepolto. Questa importante caratteristica ha comunque lo svantaggio dovuto al tempo di elaborazione dei dati da parte dell'ARTVA digitale, che date le sue scarse prestazioni computazionali (per motivi di durata batterie) ha un discreto delay nel fornire tale indicazione. 

Il dispositivo digitale presenta una indicazione di direzione e un numero che rappresenta la distanza. Entrambi i dispositivi, digitale e analogico, sono pensati in modo tale da permetterti di percorrere la cosidetta _orecchia di elefante_ del segnale elettromagnetico, fino a giungere alla posizione della vittima.

**In ogni caso, i migliori dispositivi presenti sul mercato sono di tipo digitale**

<!--<img src="/assets/alimonta/Ricerca_ARTVA.svg">-->

Ogni soccorritore ha inoltra a disposizione una trasmittente VHF e un cellulare. _Eventuali segnali elettromagnetici esogeni sporcano in maniera evidente il segnale in ricezione_.

Per quanto riguarda la ricerca mediante **RECCO**, tale ricerca si rivela poco precisa e spesso porta a falsi-positivi, e non rappresenta comunque una risposta definitiva nella ricerca. Si effettua sempre per completezza, ma il detector è piuttosto ingombrante e pesante. **RECCO** non può essere utilizzato per l'autosoccorso.

## Il drone

Ovviamente il grande vantaggio del drone è  la sua capacità di coprire elevate distanze sul fronte della valanga in poco tempo. Al contempo, bisogna tenere in considerazione il fatto che su queste lunghe distanze si possono trovare degli ostacoli che il drone deve evitare (ad esempio: soccorso in pista, possono esserci i piloni degli impianti di risalita). Il drone può volare tranquillamente a tre metri dal terreno, in modo da evitare le persone che possono trovarsi sul fronte di valanga (rimane comunque il problema della posizione delle sonde).

Una valanga ha diverse cause, tra le quali la principale le condizioni della neve (che dipende dal meteo), che possono causare diverse valanghe nella stessa giornata. Diventa fondamentale quindi garantire:

 * un lungo tempo operativo (batterie di buona capienza o sostituzione pacco batteria)
 * una buona portabilità (poterlo portare in uno zaino da $$35L$$, il peso non deve superare i $$5kg$$)
 * funzionare alle condizioni termiche del fronte di valanga (basse $$T$$)
 * il dispositivo ARTVA a bordo del drone deve essere robusto nei confronti di interferenze elettromagnetiche (attenzione ai motori).

Resta il problema di identificare i limiti del fronte di valanga (o la posizione di eventuali _accumuli principali_).

Il dispositivo di interfaccia potrebbe essere il cellulare/tablet in dotazione al soccorritore, interfaccia audio mediante i CB (comandi vocali) oppure un comando apposito.

Per quanto riguarda il marking, attualmente nel caso di ricerca dall'elicottero si usa il cosidetto _dardo_, ovvero un sacchettino di sabbia al quale è attaccato un nastro, per segnalare la posizione della vittima.

# Customer needs

Dalle risposte di Adriano, cerchiamo di estrapolare le **necessità del cliente**.

|N° | Necessità                                     | Rating |
|:--|:----------------------------------------------|:-------|
|1  | Identifica una persona sotto la neve          | 5 |
|2  | È autonomo                                    | 5 |
|3  | Ritorna alla posizione del soccorritore       | 5 |
|4  | Ricerca il segnale quando assente             | 5 |
|5  | È veloce negli spostamenti                    | 5 |
|6  | Marca fisicamente la posizione della vittima  | 5 |
|7  | Opera alla temperatura del fronte valanga     | 5 |
|8  | Effettua più operazioni in una giornata       | 3 |
|9  | È utilizzabile da qualunque soccorritore      | 3 |
|10 | Robusto nei confronti delle interferenze      | 5 |
|11 | È trasportabile con uno zaino da 35L          | 4 | 
