var Epub = require("./lib/epub-gen")

//console.log()
/*

let win = new BrowserWindow({show: false})
win.once('ready-to-show', () => {
win.show()
})

*/
// win.setFocusable(focusable)
// win.closable
var title = 'AAAA'
var option = {
    //css: '',
    //output: '',
    appendChapterTitles: false,
    title: title,
    author: 'authors',
    publisher: "Safari Books Online", // optional
    content: [
        {
            title: 'AAAAA',
            data: `<div class="titlepage"><div><div><h1 class="title"><a id="ch01"></a>Chapter 1. Microservices Architecture</h1></div></div></div><p>Microservices are becoming more and more popular. Nowadays, pretty much every engineer on a green field project should be considering using microservices in order to improve the quality of the systems they build. They should know the architectural principles involving<a id="id0" class="indexterm"></a> such systems. We will expose the difference between microservices and <span class="strong"><strong>Service-Oriented Architecture</strong></span> (<span class="strong"><strong>SOA</strong></span>). We will also introduce a great platform to write microservices, <span class="strong"><strong>Node.js</strong></span>, which will allow <a id="id1" class="indexterm"></a>us to create high-performing microservices with very little effort.</p><p>In this chapter, you will learn about microservices from the architectural point of view:</p><div class="itemizedlist"><ul class="itemizedlist"><li class="listitem" style="list-style-type: disc">What are microservices?</li><li class="listitem" style="list-style-type: disc">Microservice-oriented architectures</li><li class="listitem" style="list-style-type: disc">Key benefits</li><li class="listitem" style="list-style-type: disc">SOA versus Microservices</li><li class="listitem" style="list-style-type: disc">Why Node.js?</li></ul></div><div class="section"><div class="titlepage"><div><div><h1 class="title"><a id="ch01lvl1sec08"></a>Need for microservices</h1></div></div></div><p>The world of <a id="id2" class="indexterm"></a>software development has evolved quickly in the past 40 years. One of the key points of this evolution has been the size of these systems. From the days of MS-DOS, we have taken a hundred-fold leap into our present systems. This growth in size creates a need for better ways of organizing code and software components. Usually, when a company grows due to business needs, known as <span class="strong"><strong>organic growth</strong></span>, the <a id="id3" class="indexterm"></a>software is organized on a monolithic architecture as it is the easiest and quickest way of building software. After few years (or even months), adding new features becomes harder due to the coupled nature of the created software.</p><div class="section"><div class="titlepage"><div><div><h2 class="title"><a id="ch01lvl2sec06"></a>Monolithic software</h2></div></div></div><p>The natural trend for new high-tech companies such as Amazon or Netflix is building their new software using microservices, which is the ideal scenario: they get a huge advantage of microservices-oriented software (through out this book, you will learn how) in order to <a id="id4" class="indexterm"></a>scale up their new products without a big effort. The problem is that not all companies can plan their software upfront. Instead of planning, these companies build software based on the organic growth experienced: few software components group business flows by affinity. It is not rare to see companies with two big software components: the user-facing website and the internal administration <a id="id5" class="indexterm"></a>tools. This is usually known as a <span class="strong"><strong>monolithic software architecture</strong></span>.</p><p>Some of these companies face big problems when trying to scale the engineering teams. It is hard to coordinate teams that build, deploy, and maintain a single software component. Clashes on releases and reintroduction of bugs are a common problem that drains a large chunk of energy from the teams. One of the solution to this problem (it comes with benefits) is to split the monolithic software into microservices so that the teams are able to specialize in a few smaller modules and autonomous and isolated software components that can be versioned, updated, and deployed without interfering with the rest of the systems of the company.</p><p>Splitting the monolith into microservices enables the engineering team to create isolated and autonomous units of work that are highly specialized in a given task such as sending e-mails, processing card payments, and so on.</p></div><div class="section"><div class="titlepage"><div><div><h2 class="title"><a id="ch01lvl2sec07"></a>Microservices in the real world</h2></div></div></div><p>Microservices are <a id="id6" class="indexterm"></a>small software components that are specialized in one task and work together to achieve a higher-level task. Forget about software for a second and think about how a company works. When someone applies for a job in a company, he applies for a given position: software engineer, system administrator, office manager. The reason for this can be summarized in one word: specialization. If you are used to work as a software engineer, you will get better with the experience and add more value to the company. The fact that you don't know how to deal with a customer, won't affect your performance as that is not your area of expertise and will hardly add any value to your day-to-day work.</p><div class="note" style=""><div class="inner"><h3 class="title"><a id="tip02"></a>Tip</h3><p>Specialization is often the key to improve the efficiency. Doing one thing and doing it right is one of the mantras of software development.</p></div></div><p>A microservice is an autonomous unit of work that can execute one task without interfering with other parts of the system, similar to what a job position is to a company. This has a number of benefits that can be used in favor of the engineering team in order to help scale the systems of a company.</p><p>Nowadays, hundreds <a id="id7" class="indexterm"></a>of systems are built using microservices-oriented architectures, as follows:</p><div class="itemizedlist"><ul class="itemizedlist"><li class="listitem" style="list-style-type: disc"><span class="strong"><strong>Netflix</strong></span>: This<a id="id8" class="indexterm"></a> is one of the most popular streaming services, it has built an entire ecosystem of applications that collaborate in order to provide a reliable and scalable streaming system used across the globe.</li><li class="listitem" style="list-style-type: disc"><span class="strong"><strong>Spotify</strong></span>: This is <a id="id9" class="indexterm"></a>one of the leading music streaming services in the world, it has built this application using microservices. Every single widget of the application (which is a website exposed as a desktop app using Chromium Embedded Framework) is a different microservice that can be updated individually.</li></ul></div></div><div class="section"><div class="titlepage"><div><div><h2 class="title"><a id="ch01lvl2sec08"></a>Microservice-oriented architectures</h2></div></div></div><p>Microservices-oriented architectures have some particularities that makes them desirable<a id="id10" class="indexterm"></a> for any mid/large-sized company that wants to keep their IT systems resilient and in scale up/down-ready status.</p></div><div class="section"><div class="titlepage"><div><div><h2 class="title"><a id="ch01lvl2sec09"></a>How is it better?</h2></div></div></div><p>They are not the holy grail of software engineering, but, when handled with care, they become the<a id="id11" class="indexterm"></a> perfect approach to solve most of the big problems faced by tech-dependent companies.</p><p>It is important to keep the key principles of the microservices-oriented architecture's design in mind, such as resilience, composability, elasticity, and so on; otherwise, you could end up with a monolithic application split across different machines that produces problems rather than an elegant solution.</p></div><div class="section"><div class="titlepage"><div><div><h2 class="title"><a id="ch01lvl2sec10"></a>Shortcomings</h2></div></div></div><p>There is also<a id="id12" class="indexterm"></a> some criticism around microservices-oriented architectures, as they introduce some problems to deal with, such as latency, traceability, and configuration management that are not present with monolithic-based software. Some of the problems are described as follows:</p><div class="itemizedlist"><ul class="itemizedlist"><li class="listitem" style="list-style-type: disc"><span class="strong"><strong>Network latency</strong></span>: Microservices have a distributed nature so that network latency has to be accounted for</li><li class="listitem" style="list-style-type: disc"><span class="strong"><strong>Operations overhead</strong></span>: More servers indicate more maintenance</li><li class="listitem" style="list-style-type: disc"><span class="strong"><strong>Eventual consistency</strong></span>: On highly transactional systems, we need to factor into implementation the fact that the data could be inconsistent during a period of time (we will talk about it later in this chapter)</li></ul></div><p>In general, engineers should try to evaluate the pros and cons of this approach and make a decision on whether to use microservices or not in order to fit the business needs.</p><p>Microservices-oriented architectures have some particularities that need to be taken into consideration. When a software engineer is writing monolithic software, there are some problems that <a id="id13" class="indexterm"></a>are completely overlooked due to the nature of the software being built.</p><p>For example, imagine that our software needs to send e-mails. In a monolithic software, we would just add the functionality to the core of the application. We might even choose to create a dedicated module to deal with e-mails (which seems like a good idea). Now, imagine that we are creating a microservice and, instead of adding a functionality to a big software artifact, we create a dedicated service that can be deployed and versioned independently. In this case, we will have an extra step that we didn't have to take into consideration, the <a id="id14" class="indexterm"></a><span class="strong"><strong>network latency</strong></span>, to reach the new microservice.</p><p>In the preceding example, no matter what approach (monolithic or microservices) you are taking to build the software, is not a big deal; for example, if an e-mail is lost, it is not the end of the world. As per definition, the e-mail delivery is not guaranteed, so our application will still work, although we might receive a few complaints from our customers.</p></div></div>`
        }
    ]
};

new Epub(option, `./${title}.epub`);