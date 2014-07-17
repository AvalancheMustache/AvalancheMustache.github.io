---
layout: post
title: Aree Applicative del progetto
date: 2014-05-20 12:00:00
categories: applications
author: MatteoRagni
comments: true
commment_id: 20140520120000
file: 2014-05-20-Aree-Applicative-del-progetto.markdown
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

#  Note di progetto


### Contenuti
{:.no_toc}

 * contenuti
 {:toc}


### QFD

<img src="/assets/aree_app/qfd.png">

### Geometria del dardo e sistema di rilascio del dardo

Alcune considerazioni sulla geometria del dardo. Una scelta possibile è la stella a quattro punte con un nastro annesso, in modo tale che, marcata la posizione del sepolto, nel caso il vento sposti il dardo, le punte di quest'ultimo lo portino a conficcarsi nella neve. Ovviamente la geometria deve essere compatibile con quello che sarà il meccanismo di rilascio.

Il peso si attesta attorno i 100g in modo tale che si possano caricare più dardi sul drone. Aspetti da approfondire:

 * Design
 * Caratterisctiche
 * Materiale
 * Prototipo

Per il rilascio del dardo è necessario progettare da zero il sistema di elettro/meccanico, in quanto primo nel suo genere. Il sistema deve essere progettato secondo caratteristiche di minimo peso e minima interferenza elettronica nei confronti del sistema, oltre che avere una forma coerente nei confronti del dardo. 

 * Azionamento
 * peso contenuto
 * numero di dardi da trasportare
 * affidabilità
 * funzionamento alle basse temperature

Questi due componenti fanno parte di una delle richieste dei _costumers_ di soccorso in montagna.

### Gestione area di ricerca

In questo contenuto si cerca di definire la strategia migliore per la gestione dell'area di ricerca nelle condizioni di identificazione e non indentificazione del segnale.

 * gestione del segnale (identificato/non identificato)
 * identificazione della dimensione dell'area di ricerca
 * procedura di esplorazione dell'ambiente
 * procedura di uscita/rientro nella routine di esplorazione all'identificazione/dopo l'abbandono per identificazione segnale

Nonostante sembri si sia già parlato di questo elemento in altre parti del docuento, questo argomento tende ad essere un elemento collante, ovvero la definizione di un metodo sinergico per fare in modo che le singole implementazioni concertino in modo coerente, rendendo tale approfondimento non banale.

### Pianificazione della traiettoria (con ostacoli)

La pianificazione della traiettoria in caso di segnale identificato prevede tre fasi principali:
 * calcolo del gradiente positivo dovuto al segnale ARTVA
 * identificazione mediante sensori di ostacoli attorno al drone
 * calcolo del gradiente negativo dovuto alla presenza di ostacoli
 * generazione della traiettoria mediante gradiente

### Mantenimento altitudine

Utilizzare il sensore di pressione e il GPS per mantenere l'altitudine sulla superfice stabile di ~$4m$ rispetto al suolo.

### Modellazione dinamica sistema

La modellazione dinamica del sistema rappresenta uno step fondamentale della simulazione. Si definisce un modello che rappresenti lo stato del sistema sulla base dello stato precedente e delle forze usate come ingresso (o le velocità angolari)
$$\dot{x}=f(x,F)$$
dove $x$ sono gli stati e $F$ sono le forze.

Questo modello potrebbe essere poi collegato in serie con un altro modello dei motori e al modello di guida automatica.

Attualmente, abbiamo elaborato un primo modello, tratto da [\[1\]](#riferimenti):

$$m\,\ddot{\xi} = RF^{b}-m\, g\, e_{3}^{i}$$
$$M(\eta)\,\ddot{\eta+C(\eta,\dot{\eta}})\,\dot{\eta} = \Psi(\eta)^{T}\,\Gamma^{b}$$

e soggetto al seguente loop di controllo:

$$u = m |(\mu\left(\chi,\ddot{\xi}\_{d}\right)+g\,e\_{3}^{i}| = m\,|-K\_{\chi}\,\chi+\ddot{\xi}\_{d}+g\, e\_{3}^{i}|$$
$$ \tau=J\,\Psi(\eta)\,\tilde{\tau}+\Psi^{-1}\,C(\eta,\dot{\eta})\,\dot{\eta}=J\,\Psi(\eta)\,(-K_{e}e+\ddot{\eta}_{d})+\Psi^{-1}\,C(\eta,\dot{\eta})\,\dot{\eta} $$

La strategia è basata su un doppio loop, come rappresentato nel seguente schema tratto sempre dallo stesso riferimento:
<img src="/assets/aree_app/AspettiImmagine1.png">

### Modellazione elettronica spinta

In questa sezione si fa la modellazione di tutto il sistema di propulsione, completo di motore. Si cerca di modellare la funzione:

$$F = F(I) $$
$$M = M(I) $$ 

ovvero la forza impressa e la coppia di drag del motore sul frame in funzione della corrente.

### Lettura sensori posizione/orientamento con GPS

Utilizzando l'algoritmo di Kalmann, integrare la precisione del sensore GPS con accelerometro/giroscopio/magnetometro della IMU, in modo da incrementare al massimo il sistema di osservazione della posizione del drone. Tale precisione è fondamentale per aspetti quale posizionamento del soccorritore etc.

### Landing, take off, landing with failure

Le strategie di partenza e di atterraggio (anche in condizioni di malfunzionamento) devono essere progettate appositamente. Come si deve comportare il drone nel caso di rottura non catastrofica o catastrofica di un componente?

### Costruzione sistema di lettura segnale ARTVA

Il sistema ARTVA che abbiamo a disposizione dal soccorso alpino e speleologico, è a singola antenna. Non è possibile carpire un segnale vettoriale da questi modelli. Quello che si propone è di sviluppare, seguendo quanto definito nelle normative internazionali, un ARTVA di tipo diverso, avente tre elementi di ricezione equivalenti nelle tre direzioni dello spazio. Utilizzando un sistema di questo tipo si spera di ottenere uno pseudo vettore
 * direzionale
 * con intensità definita
 * non orientato

In seguito ottenere la variazione della magnitudo del segnale ricevuto, per identificare la orientazione. Sulla base di queste informazioni generare un campione $x$ che viene aggiunto ad una famiglia di campioni $X$ utilizzata per proiettare la distribuzione probabilistica del segnale, che coincide con la proiezione della posizione più probabile di un disperso:

$$p(x|X) \rightarrow \hat{p}(x|\theta)$$

con $\theta$ parametri che rappresentano la proiezione del segnale.

Inoltre si deve tenere conto della matrice di decisione della _radar signal detection theory_, secondo la quale si identificano 4 elementi di costo nella decisione di identificazione o no di un segnale:

|                          | Ipotizza presenza segnale (1)                            | Ipotizza assenza segnale (0)                                          |
|--------------------------|----------------------------------------------------------|-----------------------------------------------------------------------|
| **Segnale Presente (1)** | $C_{11}$ - Segnale identificato correttamente (HIT)      | $C_{10}$ - Mancata identificazione (MISS)                             |
| **Segnale Assente (0)**  | $C_{01}$ - Segnale identificato per errore (FALSE ALARM) | $C_{00}$ - Segnale non identificato correttamente (CORRECT REJECTION) |

Il segnale in ingresso richiede un filtraggio, del quale si è già fatto un design iniziale che fa uso di un filtro attivo ad opamp:

<img src="/assets/aree_app/Schematico_filtro.svg">
<img src="/assets/aree_app/Risultati_filtro.svg">

Un possibile sistema di ricezione, basato su quanto scritto sulla normativa del segnale ARTVA [\[2\]](#riferimenti):
 * modulazione di tipo **A1A**
   * A: Double sideband amplitude modulation
   * 1: One channel containing digital information, no subcarrier
   * A: Aural telegraphy, intended to be decoded by ear, such as Morse code
   * 457kHz ± 80 Hz
 * La modulazione è emessa come pulsazione:
   * on time: 70ms
   * off time: 400ms
   * periodo: 1s ± 300 ms

potrebbe essere il seguente:

<img src="/assets/aree_app/Ricevente.svg">

(del quale non ci sono ancora simulazioni, non esistendo una libreria per il modello MK484 o TA7642 da inserire in Spice)

Per quanto riguarda gli algoritmi statistici:
 * per la identificazione della presenza del segnale si potrebbe usare la [**Minimum Risk Criterion Theory**](http://en.wikipedia.org/wiki/Likelihood-ratio_test)
 * per la proiezione del segnale sulla base di una famiglia di campioni si potrebbe usare [**Estimation-Maximization Algorithm for partial data**](http://en.wikipedia.org/wiki/Expectation%E2%80%93maximization_algorithm)

Il secondo algoritmo è particolarmente dispensioso dal punto di vista computazionale.

### Opera alla temperatura del fronte di valanga

Questa è una _need_ molto importante e determinante sulla riuscita dell'intero funzionamento del prodotto, dato che le temperature sul fronte di valanga sono molto rigide.

La batteria è un punto di criticità per il sistema: sottoposta ad una temperatura estremamente rigida perde carica molto rapidamente e fornisce una minore corrente. Probabilmente sarà necessario prevedere la coibentazione, se non un vero e proprio sistema di riscaldamento attivo.

### Strategia di swarm

Nel caso il segnale non venga identificato, sarà necessario definire delle strategie di ricerca di segnale. La strategia dovrà tenere conto:
 * delle dimensioni del fronte di valanga
 * delle posizioni a maggiore probabilità di accumulo del disperso
 * della distanza massima di percezione di un segnale
 * della probabilità a sostenere che non si sta identificando nessun segnale

Esistono diverse tecniche di ricerca, la prima proposta è quella della spirale di massimo raggio rispetto ad una posizione centrale definita mediante gps.

### Stabilizzazione del volo e il problema del vento

La stabilizzazione del volo prevede la definizione di tutta la strategia di controllo/compensazione disturbi per mantenere in hovering il drone o mantenere sufficientemente stabile il sistema durante la fase di spostamento/take off/landing.

L'interferenza critica è il vento come causa di destabilizzazione del sistema. Quando l'intensità del vento raggiunge valori elevati non può più essere visto come un semplice rumore da compensare, ma un vero e proprio ingresso esogeno. Si rende necessario misurare la velocità del vento in maniera da inserirlo correttamente nella dinamica del sistema ai fini della compensazione autonoma.

Questo potrebbe prevedere la progettazione di un sistema di misura dalle seguenti  caratteristiche:

 * Affidabile.
 * Funzionante alla basse temperature.
 * Peso contenuto.

Una possibilità potrebbe essere la misurazione della velocità apparente dell'aria, a cui sottrarre la velocità di avanzamento del drone per ottenere la velocità del vento. Una possibile soluzione potrebbe fare uso di [sistemi a tubo di pitot](https://store.3drobotics.com/products/airspeed-kit-with-mpxv7002dp)

### Interferenza elettromagentica

Non ci devono essere interferenze e/o degenerazione della qualità del segnale tra il drone/ARTVA e altri device impiegati nel soccorso/dispositivi nella zona di intervento. Inoltre si deve considerare il problema della interferenza della elettronica di controllo nei confronti del sistema di ricezione del segnale ARTVA del drone, al fine di mantenere la lettura il più possibile pulita.

Dalle nostre prove (molto empiriche) un motore brushless sembra non avere effetto su un ARTVA commerciale, problema fortunatamente già risolto in parte dalla cassa esterna di questi motori che tendono ad agire come una gabbia di Faraday, se correttamente posti a massa. Il problema potrebbe presentarsi con gli ESC FET che producono anch'essi forti campi elettromagnetici di interferenza. Anche in questo caso si deve pensare a sistemi di schermaggio.

Inoltre, al fine di garantire la compatibilità con i mezzi di soccorso, il dispositivo deve avere:

 * numero seriale
 * essere certificato da un ente abilitato come compatibile con il tipo di veicolo
 * non avere dispositivi vietati (come batterie Li-Po in favore di batterie "blindate" LiFePO4)

### Possibile configurazione di acquisto iniziale

|    | **Oggetto**                                                                                                         | **Prezzo/Unità** |
|----|---------------------------------------------------------------------------------------------------------------------|------------------|
| 1x | [Autoquad 6 Flight Controller](http://flyduino.net/Multcopter-FC)                                                   | 300€             |
| 6x | [ESC32](http://flyduino.net/Autoquad-ESC32_1)                                                                       | 40€              |
| 6x | [T-Motor U3 700KV](http://flyduino.net/Multikopter-Brushless-Motor-Multicopter_18)                                  | 90€              |
| 6x | [APC 13"x4" e-Propeller](https://www.hobbyking.com/hobbyking/store/__6386__APC_style_propeller_13x4_E.html)         | Variabile        |
| 2x | [Batterie Li-Po 5000mAh 4S1P 30C](http://flyduino.net/SLS-XTRON-5000mAh-4S1P-148V-30C-60C-FLAT-XT90_1)              | 60€              |
|    | **Totale**                                                                                                          | ~1300€           |

### Riferimenti

 1. **Autonomous Flying Robots: Unmanned Aerial Vehicles and Micro Aerial Vehicles**, Kenzo Nonami, Farid Kendoul, Satoshi Suzuki, _Springer, 2010_
 2. **Normativa ARTVA**, ETSI EN 300 718-1
 3. **Pattern Classification**, R. Duda, P. Hart, D. Stork, _Wiley-Interscience, 2006_