---
layout: post
title:  "Come creare un post"
date:   2014-03-29 17:00:00
categories: jekyll blog
author: "Matteo Ragni"
comments: true
comment_id: "20140329170000"
file: 2014-03-29-come-postare.markdown
---

# Contenuti
{:.no_toc}

 * Tabella contenuti
 {:toc}
 
# Come è strutturato il post

**EDIT: D'ORA IN AVANTI � POSSIBILE UTILIZZARE L'EDITOR INSERITO NEL SITO, SIA PER L'AGGIUNTA CHE PER LA MODIFICHE DEI POSTS**

Il post è un documento in markdown slavato nella direcotry `_post`. Per poter salvare il file nella directory è necessario utilizzare `git` come interfaccia al post.

Un nuovo post deve essere salvato secondo la convenzione `YYYY-MM-DD-titolo-del-post.markdown`, in modo tale che possa essere ordinato nella pagina iniziale del blog. All'interno del file troviamo due sezioni: il front-matter e il corpo del post.

## Front-matter

Il front-matter è una piccola sezione iniziale per la pagina, caratterizzato da delle variabili indispensabili per l'interprete. Ad esempio, ecco il front-matter di questo post:
{% highlight xml %}
---
layout: post
title:  "Come creare un post"
date:   2014-03-29 17:00:00
categories: jekyll blog git
author: "Matteo Ragni"
comments: true
comment_id: "20140329170000"
file: 2014-03-29-come-postare.markdown
---
{% endhighlight %}
Analizziamo le singole variabili:
 * Il front matter è all'inizio del file e racchiuso tra `---`.
 * `layout`: definisce il tipo di pagina su cui inserire i contenuti. In generale useremo sempre `post`.
 * `title`: ovviamente il titolo del post!
 * `date`: la data in cui è stato creato il post.
 * `categories`: una lista, separata da spazi, degli argomenti principali del post,che in seguito sono rappresentati sotto forma di label automaticamente nella homepage del blog.
 * `author`: l'autore del post.
 * `comments`: questa variabile abilita i commenti in fondo al post.
 * `comment_id`: per poter discriminare le diverse conversazioni, si utilizza un codice identificativo; per convenzione il codice identificativo è caratterizzato dalla data e l'ora del post senza punteggiatura.
 * `file`: il nome del file markdown.
 
Un post senza front-matter non è interpretato e non genera nessuna pagina nel blog.
 
## Corpo del post
 
Il corpo del post è la parte interpretata in Markdown. Per la sintassi fare riferimento al post [**Il primo post**][post1] e al suo [**sorgente**][post2].
 
# Il repo `avalanchemustache.github.io`

Per poter postare **è necessario un account Github** e **l'accesso alla organizzazione AvalancheMustache** che può essere richiesto a [_me_][mailme]. Inoltre è necessario avere un client `git`. Nella massa dei client disponibili, il mio preferito è ovviamente il classico a riga di comando. Semplifichiamo l'utilizzo al massimo, ma teniamo in considerazione che è possibile imparare ad utilizzare appieno le sue caratteristiche seguendo [questa guida][gitguida].

## Clonare il repo (una tantum)

Una volta installato il client per `git`, sono sufficienti alcuni semplici passaggi per ottenere una copia del sito in locale, sul quale lavorare. In primo luogo aprire una console e portarsi nella directory nella quale si vuole _clonare il repo_, poi eseguire:
{% highlight bash %}
git clone https://github.com/AvalancheMustache/AvalancheMustache.github.io.git
{% endhighlight %}
Questa operazione deve essere eseguita solo una volta. Si potrà notare la creazione di una nuova directory `AvalancheMustache.github.io`. All'interno di questa directory è presente tutto il sito. Ora è possibile aggiungere un nuovo post in `_post`.

## Aggiornare il repo

Prima di postare è necessario aggiornare la situazione del repo, in modo tale che sia sempre aggiornato (correzioni, etc.). Per l'aggiornamento utilizzare il comando, dalla directory del progetto:
{% highlight bash %}
git fetch
{% endhighlight %}

## Post e salvare le modifiche

Dopo aver scritto il post, è necessario aggiungere il file all'index con il comando:
{% highlight bash %}
git add .
{% endhighlight %}
(in relatà il comando aggiunge qualsiasi file inserito all'interno delle directory all'index, ma in questo modo è più rapido) e fare il `commit` delle modifiche, e sincronizzarle:
{% highlight bash %}
git commit -m "<<< piccola stringa che spiega le modifiche fatte >>>"
git push -u origin master
{% endhighlight %}
`git` chiederà nome utente e password.

## Modificare un post

Prima di modificare un post, assicurarsi di aggiornare il repo.

In seguito modificare il file relativo al post che si desidera variare, e eseguire nuovamente i passaggi `add`, `commit` e `push` come descritti al punto precedente.

 [post1]: http://localhost:4000/jekyll/welcome/latex/code/2014/03/29/il-primo-post.html
 [post2]: https://raw.githubusercontent.com/AvalancheMustache/AvalancheMustache.github.io/master/_posts/2014-03-29-il-primo-post.markdown
 [mailme]: mailto:matteo.ragni@studenti.unitn.it/?subject=AccessoBlogAvalancheMustache
 [gitguida]: http://try.github.io/levels/1/challenges/1