---
layout: post
title:  "Il primo Post!"
date:   2014-03-29 10:50:00
categories: jekyll welcome latex code
author: "Matteo Ragni"
---

# Benvenuto

E finalmente il primo post nel nostro nuovissimo blog di sviluppo per il drone `Avalanche Mustache`.

## Contenuti
{:.no_toc}

* Tabella Contenuti
{:toc}

## Cos'è questo?

Questo è un piccolo blog statico, ma presenta qualche potenzialità non banale. Possiamo ad esempio fare alcune cose come **scrivere del testo** _formattato_, utilizzando come linguaggio di markup il semplicissimo `Markdown`. Inoltre, grazie all'integrazione del generatore `Jekyll`, del parser `kramdown` e del pacchetto javascript `MathJax` abbiamo la libertà di scrivere anche qualcosina in più nelle nostre pagine statiche!

[`Jekill`][jekyll] è il generatore di siti statici (Ruby based). Dobbiamo seguire qualche piccola regola per permettere al parser di costruire le nostre pagine. La struttura delle directory del sito sono un esempio. All'interno della root del sito troviamo:

 * `_layouts`: questa directory contiene i layouts html del sito. Questi sono in realtà dei templete secondo il formato `liquid`, perchi le pagine contenute qui dentro sono prima interpretate per elementi che rappresentano il markup di `liquid`. Tutti i posts del blog sono inseriti nella folder `_posts`, secondo la forma `YYYY-MM-DD-name-of-post.markdown`.
 * `_posts`: la folder più importante per noi! **Contiene tutti i posts che scriveremo per il blog**. I file contenuti qui dentro sono in [`markdown`][markdown] e interpretati da un parser ruby chiamato [`kramdown`][kramdown]. All'interno della folder, con il nome `2014-03-26-welcome-to-jekyll.markdown` trovate il sorgente di questo post, scritto con l'intento di utilizzare la sintassi in modo più ampio possibile e mantenerlo come documento di riferimento per i nuovi post.
 * `_site`: in questa directory viene salvata la versione generata del sito da parte di `jekyll`
 * `css`: questa directory continene gli stylesheet per l'intero sito.
 * il file `_config.yml`: è il file di configurazione di `jekyll`.
 * il file `index.html`: è ovviamente l'homepage del progetto!

## E che ci possiamo fare?

Più o meno tutto quello che si può fare con un blog di sviluppo: dare news, incrementare l'hype, permettere alla gente di contattarci e soprattutto presentare i nostri risultati! Vediamo qualche feature particolare:

### Inserire del codice sorgente

Il codice sorgente è molto semplice da inserire utilizzando il markup di `liquid` con la direttiva `highlight`. Di seguito ad `highlight` possiamo definire il tipo di linguaggio e se vogliamo l'opsione per i numeri di linea. Ad esempio: `highlight ruby linenos` per un pezzettino di codice ruby diventa:

{% highlight ruby linenos %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

La sezione di codice si chiude con la direttiva `endhiglight`.

### Inserire dei link o delle immagini

Per inserire dei link o delle immagini si fa riferimento alla direttiva classica di `Markdown` per i link e i contenuti multimediali. Le immagini che devono essere rimensionate possono essere inserite sfruttando semplicemente del codice `HTML`, prima di caricarle sul sito!

{% highlight HTML linenos %}
<img src="/assets/nome_immagine.ext" alt="descrizione" onclick="imageZoom(this, '50%')" style="width: 50%">
{% endhighlight %}

Ecco un esempio:
<img src="/assets/example.jpg" alt="Una immagine di esempio" onclick="imageZoom(this, '30%')" style="width: 30%">

La voce `imageZoom(this, '50%')` è utilizzata per il rescaling automatico delle immagini al click, in modo che passi dal $$50\%$$ al $$100\%$$.

### Inserire formule LaTeX

Abbimao abilitato l'interprete $$\LaTeX$$, e siamo quindi in grado di inserire alcune belle formulone in linea $$x^2 + y^2 + 2 x y = (x+y)^2$$ e qualche bella formulona in centro pagina (e numerarla anche!)

$$
\begin{equation}
\begin{aligned}
\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} & = \frac{4\pi}{c}\vec{\mathbf{j}} \\   \nabla \cdot \vec{\mathbf{E}} & = 4 \pi \rho \\
\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t} & = \vec{\mathbf{0}} \\
\nabla \cdot \vec{\mathbf{B}} & = 0 \end{aligned}
\end{equation}
$$

Buon divertimento!

P.S. Il sito è completamente **vettoriale**!

[markdown]: http://daringfireball.net/projects/markdown/syntax
[kramdown]: http://kramdown.gettalong.org/
[jekyll]: http://jekyllrb.com
