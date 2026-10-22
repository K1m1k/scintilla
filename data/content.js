/* =======================================================================
   Scintilla — content & settings. Edit THIS file to update the site.
   No build step: save, reload the page, done.
   ======================================================================= */

window.SITE = {

  /* --- settings ------------------------------------------------------- */
  // Where the contact form sends to. Leave "" to send visitors to GitHub
  // instead. Put your email here to turn the form into a pre-filled email.
  contactEmail: "",
  github: "https://github.com/K1m1k",
  medium: "https://medium.com/@ilxuomo",

  /* --- projects ------------------------------------------------------- */
  // Each project has its own page: projects/project.html?id=<id>
  // Fields:
  //   id      unique slug used in the URL
  //   name, meta, desc, tags   -> the card on the home page
  //   detail  -> the project page: { tagline, body: [ ...blocks ] }
  // Body blocks (same format used by articles, plus code):
  //   "plain text"                    -> a paragraph
  //   { h2: "A subheading" }          -> a subheading
  //   { ul: ["point", "point"] }      -> a bullet list
  //   { code: "…", caption: "…" }     -> an illustrative code snippet
  // The snippets are deliberately simplified sketches: they show the idea,
  // not the real source code or the internal structure of the projects.
  projects: [
    {
      id: "emersione",
      name: "Emersione",
      meta: "Web platform · labour & public interest",
      desc: "Cross-checks what a business declares against what its work really requires, and flags the gaps that deserve a human look. Open source, built to be proposed to public institutions.",
      tags: ["Python", "Starlette", "Explainable AI"],
      detail: {
        tagline: "Undeclared work can hide from an inspector's eyes. Hiding from its own contradictions is much harder.",
        note: "Emersione is open source (code under EUPL-1.2, documentation under CC BY 4.0): its source code, methodology and known limits are public on GitHub.",
        body: [
          { h2: "What it is" },
          "Emersione — Italian for \"surfacing\" — is a platform for spotting possible undeclared and irregular work. It compares what a business declares (staff, hours, labour costs, output) with what its activity would realistically require, and points out the gaps that deserve a closer look by a human inspector.",
          "It grew out of an essay I wrote, [Can an Algorithm Help Bring Undeclared Work to Light?](https://k1m1k.github.io/scintilla/writing/article.html?id=algoritmo-lavoro-irregolare) I wanted to find out whether that idea could stand up as working software. It is the project I would most like to see in the hands of public institutions.",
          { h2: "How it is built" },
          { ul: [
            "Python, with Starlette and Jinja2 for a lightweight web interface and SQLite for local storage.",
            "A rule engine driven by a declarative registry: each sector — agriculture, construction, logistics, hospitality — is a formula plus sourced coefficients, not hidden code.",
            "Connectors for public data sources (ISTAT, ANAC) and CSV imports, each with declared provenance.",
            "PDF reports with a verifiable fingerprint, and 116 automated tests run on every change."
          ] },
          { h2: "Explainable by design" },
          "The hard part of a tool like this is not computing a score — it is being able to justify it. Every result can be traced back to its formula, its coefficients and their sources. Before a result is shown, each parameter is pushed 20% up and down: if the conclusion flips, the result is declared unstable instead of being presented as solid. Missing or implausible data give \"not assessable\", never a silent zero.",
          { code:
"# Illustrative sketch — simplified from the real engine.\n" +
"# A gap only counts if it survives a ±20% change\n" +
"# in each uncertain parameter.\n\n" +
"def robustness(expected_fn, declared, params, threshold):\n" +
"    outcomes = set()\n" +
"    for name in params:\n" +
"        for factor in (0.8, 1.0, 1.2):\n" +
"            p = {**params, name: params[name] * factor}\n" +
"            expected = expected_fn(p)\n" +
"            outcomes.add((expected - declared) / expected > threshold)\n" +
"    return \"stable\" if len(outcomes) == 1 else \"unstable\"",
            caption: "The robustness idea: a flag that depends on the exact value of an uncertain coefficient is not a flag — it is reported as unstable." },
          { h2: "Safeguards & privacy" },
          "A tool that looks at businesses and workers can do harm if it is used carelessly, so the limits are built in:",
          { ul: [
            "It does not establish wrongdoing, estimate guilt or publish rankings: it suggests where to look, and every decision stays with a person.",
            "Confidential data stay with the authorized public body; on its own, the platform collects only public information, respecting each site's rules.",
            "Role-based access with separation of duties: whoever proposes a coefficient cannot approve it.",
            "A tamper-evident audit trail: every action is chained to the previous one, so any change leaves a trace.",
            "A new sector starts as a draft and produces no results until it passes automated tests and human approval."
          ] },
          "Unlike my other projects, Emersione is fully open source: a tool that touches work, businesses and people's rights should be open to scrutiny.",
          "Version 3.1 is a complete prototype, but it runs on synthetic data and its coefficients are still hypotheses to be verified. What it needs now cannot be written in code: lawful access to real data, the outcomes of past inspections to measure how often a flag is right, and independent review. If you work in research, in a public administration or in data protection, or you know the field first-hand, [the project is on GitHub](https://github.com/K1m1k/Emersione) and [its Discussions are open](https://github.com/K1m1k/Emersione/discussions)."
        ]
      }
    },
    {
      id: "mialifeapp",
      name: "MiaLifeApp",
      meta: "Android app · personal safety",
      desc: "A personal-safety app for Android. One discreet gesture sends an SOS with your location to trusted contacts — built for emergencies, where seconds matter and attention must not be drawn.",
      tags: ["Android", "Kotlin", "SOS"],
      detail: {
        tagline: "A discreet, phone-only safety companion — no server of mine sits between a victim and help.",
        body: [
          { h2: "What it is" },
          "MiaLifeApp is an Android app for personal safety and protection against assault. The person at risk configures a few trusted contacts in advance. When the app is triggered — discreetly, without lighting up the screen — it asks for help and starts collecting evidence that is meant to survive even if the phone (or the person) does not.",
          "It is a project I care about deeply, and one I don't intend to make money from.",
          { h2: "How it is built" },
          "The guiding decision is architectural: everything runs on the user's own phone. There is no server or service of mine in the middle. The only things that ever leave the device are SMS messages to the chosen contacts and evidence sent to a channel the user already owns.",
          { ul: [
            "Kotlin, with classic Android Views + XML (not Compose) for broad device compatibility.",
            "Native platform APIs for sensors, SMS, location and microphone.",
            "WorkManager for a resilient queue: messages and uploads retry on their own when connectivity returns.",
            "Configuration stored encrypted on the device.",
            "Evidence delivered only to user-owned channels (their own cloud drive or mailbox)."
          ] },
          { h2: "Discreet activation" },
          "The hard part of a safety app is being triggered without the attacker noticing. MiaLifeApp uses a two-phase model. In normal conditions the app and the phone do nothing visible. Phase 1 is a silent alert, triggered from inside a pocket with a sequence of volume-button presses when a situation starts to feel wrong. Phase 2 is the actual call for help, triggered by a spoken phrase, a different button sequence, or a Bluetooth keyfob.",
          "An alternative trigger uses the accelerometer to detect a rhythm of taps on the back of the phone. It relies on the pattern of the taps, not on how hard they are, which would be unreliable. The screen stays dark the whole time: to anyone watching, it should look like someone nervously drumming their fingers.",
          { code:
"// Illustrative sketch — not the real implementation.\n" +
"// Match a *rhythm* (pattern of intervals), never raw force.\n\n" +
"fun matches(taps: List<Long>, pattern: List<Long>, tol: Double): Boolean {\n" +
"    if (taps.size != pattern.size) return false\n" +
"    return taps.zip(pattern).all { (actual, expected) ->\n" +
"        kotlin.math.abs(actual - expected) <= expected * tol\n" +
"    }\n" +
"}",
            caption: "The concept of the tap-rhythm trigger — a tolerant interval match, so the user never has to be precise to the millisecond." },
          "On activation the app sends an \"I need help\" SMS with the location to the trusted contacts, starts recording audio in short chunks, uploads those chunks, and keeps sending an updated location at regular intervals. If the network drops, messages and uploads are queued and retried automatically; recording never stops just because there is no signal.",
          { h2: "Security & privacy" },
          { ul: [
            "With no backend, there is no central database of victims' data that could be breached.",
            "A PIN is required to stop the alarm, disarm the app or change its settings. A separate duress PIN can also be set: if an attacker forces the victim to enter it, the app appears to shut down but keeps working.",
            "Configuration is encrypted at rest on the device.",
            "Audio is recorded and uploaded in chunks, so at least part of the evidence survives even if the phone is destroyed.",
            "An offline queue preserves everything until the connection returns."
          ] },
          "MiaLifeApp is honest about its limits: it is not infallible, aggressive battery-saving settings on some phones can interfere with it, and it is no substitute for calling the emergency services. The setup guide walks the user through every step and asks them to read and confirm the safety notices before finishing."
        ]
      }
    },
    {
      id: "kamishibai",
      name: "Kamishibai",
      meta: "Web app · accessibility",
      desc: "Recognizes Italian Sign Language (LIS) from a webcam and shows the interpreted words under the video. Lessons are uploaded by an authorized community, so the model keeps learning.",
      tags: ["Web", "Computer vision", "LIS"],
      detail: {
        tagline: "Understanding someone who signs — and learning, visually, while you do.",
        body: [
          { h2: "What it is" },
          "Kamishibai is a web app, for desktop or phone, that watches a person signing and shows the interpreted words beneath the video, close to real time. It grew out of a simple wish that predates the current AI boom: to be able to understand someone who uses sign language if they ever asked for help in the street.",
          "Authorized members can upload lessons: they perform a sign, type its meaning and save it, so the vocabulary the system recognizes keeps growing.",
          { h2: "How it is built" },
          { ul: [
            "A computer-vision pipeline that extracts hand and face keypoints from the webcam frames, rather than storing raw video.",
            "Near-real-time processing, because a translation that lags behind is of little use in a real conversation.",
            "A web interface that works with both computer webcams and phone cameras.",
            "A guidance frame around the video that turns green at the ideal distance and red when the framing is off — with a generous tolerance, so the user never has to hold an exact position."
          ] },
          "The app focuses on the official national LIS, with no regional variants and no guessing at a \"closest word\": a sign is either recognized or honestly reported as not yet learned.",
          { code:
"# Illustrative sketch — not the real pipeline.\n" +
"# Keypoints are normalized so position/scale don't matter;\n" +
"# a short sequence of frames is what gets classified.\n\n" +
"def normalize(landmarks, origin, scale):\n" +
"    return [((x - origin.x) / scale, (y - origin.y) / scale)\n" +
"            for (x, y) in landmarks]\n\n" +
"def label_for(sequence):\n" +
"    # sequence = recent normalized frames\n" +
"    return classifier.predict(sequence)   # or 'unknown'",
            caption: "The idea behind recognition: normalize the keypoints, classify a short window of frames, and prefer an honest \"unknown\" over a wrong guess." },
          { h2: "Security & contributions" },
          "Because the community shapes what the system learns, contributions are carefully controlled:",
          { ul: [
            "Anyone can register, but new accounts cannot contribute until the author grants permission.",
            "Every new sign is reviewed and approved by the author before it enters the vocabulary.",
            "Permissions and accounts can be revoked; when that happens, the author decides case by case whether to keep or delete that account's signs.",
            "The app runs in its own isolated environment, separate from the author's other projects."
          ] },
          "Kamishibai is openly a work in progress, not a finished product: it is still being tested and improved, with help from its contributors. Anyone who wants to help is welcome to get in touch, including people who can create the illustrated sign examples."
        ]
      }
    },
    {
      id: "hive-net",
      name: "hive-net",
      meta: "Distributed network · volunteer computing",
      desc: "A network of private PCs that share their spare computing power, with the owner's consent, inside a transparent sandbox. Contributors earn credits to spend on their own jobs.",
      tags: ["Python", "Node.js", "WebAssembly"],
      detail: {
        tagline: "Bees lend power, the hive keeps the honey — volunteer compute that is honest about what it runs on your machine.",
        body: [
          { h2: "What it is" },
          "hive-net (working name: Alveare — \"beehive\") is a network of private, heterogeneous PCs that lend their spare compute. An orchestrator server splits large AI-training jobs into many small, tagged chunks, hands them out to the nodes, and reassembles the results as they come back.",
          "People who run a node sign up, choose the days and hours they want to lend power, and earn credits they can spend to train their own projects or to obtain data that has already been processed. Those who don't lend computing power pay to use the network.",
          { h2: "How it is built" },
          { ul: [
            "An orchestrator server (Python) that fragments work, distributes it and reassembles it.",
            "A node agent (\"worker bee\", Node.js) that pulls chunks and returns results.",
            "A WebAssembly sandbox that isolates every job from the host machine.",
            "Version 1 handles text and tables only; images come later."
          ] },
          "The nodes monitor themselves and contact the server only when needed, instead of the server constantly polling them.",
          { h2: "Security & privacy" },
          "Lending your machine to a network is an act of trust, so the design puts isolation and data protection first:",
          { ul: [
            "Every job runs inside a WebAssembly sandbox and cannot reach the host system.",
            "Original data is visible only to the server and the requesting node, and is deleted when the job ends; the server keeps only the processed results.",
            "Work packets travel fragmented and encrypted, and are decrypted one piece at a time inside an area of the client that the machine's owner cannot access; the node keeps only what it needs and discards the rest.",
            "All traffic is routed through the server.",
            "Credits are internal, non-transferable points — not a currency."
          ] },
          { code:
"// Illustrative sketch — not the real protocol.\n" +
"// A node only ever sees one decrypted fragment at a time,\n" +
"// inside the sandbox; the plaintext never lands on disk.\n\n" +
"async function runChunk(envelope) {\n" +
"  const piece = await decryptInSandbox(envelope.sealed);\n" +
"  const result = await wasm.process(piece);  // isolated from host\n" +
"  wipe(piece);                               // nothing kept locally\n" +
"  return sign(result, envelope.tag);\n" +
"}",
            caption: "The privacy idea: fragment, encrypt, and decrypt one piece at a time inside an isolated area, so neither the node owner nor the host OS ever sees the whole input." },
          "The node interface and the way the project presents itself are meant to be friendly — almost a game — so that lending computing power feels approachable rather than intimidating. Version 1 is currently in its first round of testing."
        ]
      }
    },
    {
      id: "shintillam1a",
      name: "ShintillaM1A",
      meta: "Experimental AI · work in progress",
      desc: "A system that tries to simulate how humans think and remember: layered memory, emotional states, metacognition. Ambitious, still under construction.",
      tags: ["Python", "Cognitive architecture"],
      detail: {
        tagline: "An attempt to get closer to the way people process, think and remember.",
        body: [
          { h2: "What it is" },
          "ShintillaM1A is an experimental system that tries to simulate the human way of thinking and remembering — bringing a machine a little closer to how a person processes information, reasons and recalls, rather than treating memory as a flat storage space.",
          "It is an ambitious, unfinished project, and the goal is to make it work as well as possible.",
          { h2: "The approach" },
          "The architecture is being developed in Python around a few ideas borrowed from human cognition:",
          { ul: [
            "Layered memory — a fast, short-term working layer feeding a slower, consolidated long-term layer.",
            "Affective state — an emotional context that influences what the system pays attention to and what it retains.",
            "Metacognition — a loop that reflects on the system's own reasoning instead of only producing an answer."
          ] },
          { code:
"# Illustrative sketch — not the real implementation.\n" +
"# Memory is layered; what gets consolidated depends on\n" +
"# salience and the current affective state.\n\n" +
"def remember(event, state):\n" +
"    working.push(event)\n" +
"    if salience(event, state) > threshold:\n" +
"        longterm.consolidate(event)",
            caption: "The guiding idea: not everything is stored — salience and emotional state decide what crosses from working memory into the long term." },
          "This page only describes the direction and the design: the project is still at an early, exploratory stage."
        ]
      }
    }
  ],

  /* --- articles (hosted ON the site, not on Medium) ------------------- */
  // Each article has its own page: writing/article.html?id=<id>
  // Set "featured: true" on the one to highlight at the top.
  articles: [
    {
      "id": "reality-impossible-to-verify",
      "title": "When Reality Itself Becomes Impossible to Verify",
      "date": "Oct 2026",
      "read": "8 min read",
      "excerpt": "Artificial intelligence, photography and the increasingly fragile boundary between what happened and what merely appears to have happened.",
      "body": [
        "*Artificial intelligence, photography, and the increasingly fragile boundary between what happened and what merely appears to have happened.*",
        "We live in an age in which technology allows us to document the world with unprecedented ease. With a smartphone and a few seconds, we can record an event, photograph a situation, or share what we have witnessed with millions of people.",
        "For a long time, photographs and videos have been regarded as relatively reliable evidence that something happened. We knew they could be manipulated, cropped, or presented out of context, but images still carried significant documentary value: someone had been there, pointed a camera at something, and recorded what they saw.",
        "The evolution of artificial intelligence is challenging that assumption. And the problem is not simply that it is becoming possible to create increasingly realistic fakes. It also concerns the way the photographs we consider authentic are produced in the first place.",
        {
          "h2": "When a Camera Does More Than Record"
        },
        "Today, smartphones do not simply capture the light reaching an image sensor. They automatically process images, combine multiple exposures, adjust lighting, reduce noise, and enhance sharpness. In certain modes, artificial intelligence can even reconstruct details that were not clearly visible in the original image.",
        "A telling example is the controversy surrounding photographs of the Moon taken with certain Samsung Galaxy smartphones. In 2023, an experiment showed that a device could transform a deliberately blurred image of the Moon into a photograph containing far more clearly defined details than the source image itself.",
        "Samsung explained that its system combined multiple shots and used artificial intelligence to enhance details.",
        "The experiment did not prove that every Moon photograph taken with these phones is fake. It did, however, raise a fundamental question: if a device can reconstruct visual information based on what it has learned, to what extent does the final photograph represent what the sensor actually captured, and at what point does it begin to represent what the algorithm has reconstructed?",
        "[Further reading: Android Authority, March 2023](https://www.androidauthority.com/samsung-response-moon-photo-controversy-3298513/).",
        "This issue becomes even more significant when we consider that these technologies are no longer limited to unusual or specialized cases. Computational processing has become an integral part of everyday digital photography. The image we see on a screen may be the result of a combination of captured information, estimates, corrections, and details reconstructed by software.",
        "This does not mean that an edited photograph is automatically false. It means that the relationship between a real-world event and its digital representation has become more complicated.",
        {
          "h2": "When an Authentic Photograph Is Mistaken for a Fake"
        },
        "There is a second problem that is less obvious but just as concerning: doubt does not affect only artificial images. It can also affect genuine ones.",
        "In 2024, several photographers reported that authentic images posted on Facebook and Instagram were being labeled “Made with AI.” In some cases, the labels were triggered by technical indicators associated with AI-powered editing tools, even when the changes made to the images were limited.",
        "Meta acknowledged that its labels did not always align with users' expectations and changed the wording, introducing the more general label “AI info.”",
        "[Sources: TechCrunch, June 21, 2024](https://techcrunch.com/2024/06/21/meta-tagging-real-photos-made-with-ai/) and [Meta's official explanation of its AI content labels](https://about.fb.com/news/2024/04/metas-approach-to-labeling-ai-generated-content-and-manipulated-media/).",
        "An even more recent case involves automated detection systems.",
        "On October 21, 2026, the British fact-checking organization Full Fact documented five images posted by politicians that Google's SynthID detector identified as having been created or edited using AI, despite the people who posted them saying they had not used the technology.",
        "One example involved a photograph uploaded directly from an iPhone. The system flagged some trees in the background as suspicious, without providing sufficient evidence to demonstrate that the image had been generated or manipulated using AI.",
        "Following Full Fact's investigation, Google updated the system. When Full Fact checked the images again, the result had changed to “Unsure.”",
        "The investigation did not establish that automatic smartphone processing had caused these results, nor did it determine how frequently similar errors occur. It did, however, demonstrate that even a system designed to identify artificial content can produce misleading results and must be used alongside other forms of verification.",
        "[Read Full Fact's investigation](https://fullfact.org/toolkit/google-synthid-detector-flagging-apparently-real-images/).",
        "These cases highlight a fundamental distinction: detecting a signal associated with AI does not necessarily prove that a scene was fabricated. Likewise, failing to detect such a signal does not prove that an image is authentic.",
        {
          "h2": "When Fake Becomes Indistinguishable from Real"
        },
        "The central question is what might happen in the coming years.",
        "On one hand, we have systems capable of generating increasingly realistic images and videos. On the other, we have cameras and smartphones that automatically enhance the content they capture, sometimes changing details in the process.",
        "Both developments are happening at the same time.",
        "We could therefore find ourselves looking at images generated entirely by AI that appear identical to real photographs, while photographs of events that actually took place may contain elements reconstructed or altered by image-processing systems.",
        "In such a scenario, distinguishing authentic content from artificial content based on appearance alone could become increasingly difficult.",
        "We do not need to imagine a technology capable of fooling every existing detection system. It would be enough for there to be no universal method that could establish the origin of every image with certainty, regardless of the device used, the processing applied, or the steps through which the file passed before reaching us.",
        "The difficulty is not limited to recognizing images generated from scratch. Authentic footage can be cropped, enhanced, recompressed, or subsequently modified. Some changes may be harmless; others can alter the meaning of a scene, while others still can introduce details that were never captured in the first place.",
        "The boundary between documentary photography and artificial reconstruction is no longer necessarily clear-cut.",
        {
          "h2": "Verifying an Image's History, Not Just Its Appearance"
        },
        "One possible response is to develop systems that document not only the final result, but also its provenance and the changes made along the way.",
        "Initiatives such as the C2PA standard already exist. They make it possible to attach verifiable credentials to digital content, documenting its origin and history. Some technologies can also digitally sign an image at the moment of capture, creating a verifiable link to the device or system that produced it.",
        "These tools can help make verification more reliable. However, they are not an absolute guarantee.",
        "Provenance records may be incomplete, may be lost when content is shared, or may no longer be available when an image is recovered outside its original context. Moreover, proving that a file came from a particular camera does not automatically prove that the scene it depicts corresponds to reality.",
        "A photograph may have been taken with a genuine camera yet depict a staged event. A video may be authentic but presented out of context. A digital credential can document an image's history without certifying the truth of everything it represents.",
        "The C2PA standard explicitly recognizes this distinction: verifiable provenance provides important information about a piece of content's origin and modifications, but it does not, by itself, establish whether that content is true.",
        "[Official C2PA documentation](https://spec.c2pa.org/specifications/specifications/2.2/explainer/Explainer.html).",
        "The challenge, therefore, is not simply to create better labels. We need verification systems that clearly distinguish between AI-generated content, content modified using AI, content with documented provenance, and content whose origin cannot be established with sufficient confidence.",
        "Above all, we must ensure that an automated assessment is not presented as a certainty when it is merely a probabilistic indication.",
        {
          "h2": "The Liar's Dividend: When the Truth Can Be Denied"
        },
        "There is another consequence that may be even more dangerous, affecting the relationship between technology, information, and accountability.",
        "In a world where we know that images and videos can be convincingly falsified, it becomes easier to challenge authentic evidence as well.",
        "Someone caught on camera doing something could claim that the video was artificially generated. A politician could deny the authenticity of a damaging recording. An organization could dismiss documentary photography as manipulation without having to demonstrate that it actually is.",
        "In academic research, this phenomenon is known as the *liar's dividend*. The concept was explored in detail in 2019 by legal scholars Robert Chesney and Danielle Citron in their study of deepfakes.",
        "The advantage arises precisely because people have become aware that digital content can be fabricated. Anyone seeking to avoid accountability for something that really happened can exploit the general uncertainty surrounding the authenticity of evidence.",
        "It is no longer necessary to convince everyone that the evidence is fake. It may be enough to make the possibility of fabrication seem plausible.",
        "[Study: Chesney and Citron, *Deep Fakes: A Looming Challenge for Privacy, Democracy, and National Security*, California Law Review, 2019](https://www.californialawreview.org/print/deep-fakes-a-looming-challenge-for-privacy-democracy-and-national-security).",
        "The damage, therefore, is not limited to the risk of believing something that never happened. It also includes the opposite risk: no longer believing what actually did happen.",
        {
          "h2": "What Will We Be Able to Trust?"
        },
        "I do not believe we should regard a future in which every image becomes impossible to verify as inevitable. Forensic tools will continue to evolve, authentication technologies may improve, and the combination of independent sources may allow us to verify many events with a high degree of confidence.",
        "Nevertheless, I believe we need to confront a fundamental change: visual realism alone can no longer be treated as sufficient proof of authenticity.",
        "Trust will increasingly have to rest on documented provenance, file integrity, transparency about how content has been processed, and the ability to compare images with independent accounts and corroborating evidence.",
        "At the same time, developers of detection systems and the platforms that use them should clearly distinguish between content positively identified as synthetic, content modified using AI, and content whose origin cannot be determined. When a system is uncertain, it should communicate that uncertainty rather than turn it into a verdict.",
        "Technology can help us verify reality, but it should not replace verification with a new form of blind trust in its own conclusions.",
        "**The question I am asking, therefore, is not simply whether artificial intelligence will eventually be capable of creating images indistinguishable from reality. It is whether we will be able to preserve sufficiently reliable ways of proving that a photograph or video genuinely documents an event that took place.**",
        "Because the greatest risk is not simply living in a world where false evidence can be manufactured. It is living in a world where, precisely because such fabrication is possible, even genuine evidence can be called into question without there always being an accessible and conclusive way to establish the truth.",
        "And if we ever reach that point, the problem will no longer concern image technology alone. It will concern our collective ability to distinguish facts from their representations and to establish, on the basis of verifiable evidence, what we can reasonably believe."
      ]
    },

    {
      id: "superficie-d-attacco",
      featured: true,
      title: "The Target Is the Attack Surface",
      date: "May 2026",
      read: "7 min read",
      excerpt: "How visual prompt injection could compromise AI surveillance systems, from city cameras to satellites. A forward-looking analysis of the new attack surfaces of multimodal systems.",
      body: [
        "A forward-looking analysis of the new attack surfaces of multimodal systems.",
        "A network can be encrypted.",
        "A server can authenticate its users.",
        "A firewall can filter packets.",
        "But a camera cannot stop looking.",
        "Every photon that reaches the lens is turned into input for an increasingly autonomous artificial intelligence system.",
        "And this is precisely where one of the next major vulnerabilities in AI security could emerge.",
        "In recent years we have learned to regard language models as vulnerable to prompt injection attacks: malicious instructions hidden in web pages, documents or emails that can alter the behavior of an AI assistant.",
        "More recently, the AudioHijack work showed something even more unsettling: barely perceptible audio signals can be interpreted by a voice model as genuine operational commands.",
        "The inevitable question is: what happens when light, too, becomes a command channel?",
        "Modern surveillance infrastructure — smart speed cameras, city cameras, drones, industrial monitoring systems and satellite platforms — is integrating computer vision models and multimodal systems to:",
        { ul: ["recognize vehicles", "classify behavior", "identify anomalies", "generate automatic alerts", "trigger operational procedures."] },
        "These systems must, by necessity, process everything they see.",
        "And this introduces a fundamental problem: light carries no digital signature.",
        "Light cannot be authenticated before it hits the sensor.",
        "In other words, the camera stops being just a sensor and becomes an attack surface.",
        "There is no need to breach the network. Manipulating what the camera sees might be enough.",
        { h2: "From Adversarial AI to Visual Prompt Injection" },
        "The vulnerability of neural networks to adversarial perturbations has been known for more than a decade.",
        "As early as 2014, Szegedy et al. showed that tiny pixel-level changes could cause completely wrong classifications. Goodfellow later introduced the FGSM method to generate adversarial examples systematically.",
        "Since then, research has shown that these attacks can also work in the physical world:",
        { ul: ["stickers applied to road signs", "patterns printed on clothing", "adversarial patches that hold up under changes in lighting and perspective."] },
        "A simple visual pattern can make an object \"invisible\" to a detection model.",
        "With the arrival of Large Vision-Language Models (LVLMs), however, the problem has grown. Models such as GPT-4V or Gemini no longer just classify images: they read text, interpret scenes and interact with external systems.",
        "This means an image can contain instructions. And this is where visual prompt injection comes into play.",
        "Recent research has shown that hidden text, nearly invisible to the human eye, can be interpreted by the model as a valid prompt. In practice, the human sees an ordinary scene; the model sees a command.",
        "This perceptual gap opens up extremely interesting — and potentially dangerous — scenarios.",
        { h2: "The Camera as an Unauthenticated Input Channel" },
        "Modern digital systems are built around the concept of authentication. A server verifies the client's identity. An API validates tokens. A cryptographic protocol guarantees integrity.",
        "But an optical sensor can do none of this. Incoming light carries no digital signature.",
        "The sensor passively captures whatever light pattern reaches the lens:",
        { ul: ["shadows", "reflections", "writing", "perturbations", "projections", "light modulations."] },
        "Everything is converted into data. Everything is passed on to the model. If that model has access to automation or decision-making systems, the risk rises dramatically.",
        "The problem is not just misrecognition. The problem arises when a model perceives, interprets, decides and acts — without human oversight.",
        "That is the moment when perception and action collapse into the same pipeline.",
        { h2: "Scenario 1 — Attacks on Traffic Cameras" },
        "Traffic enforcement infrastructure is probably the most realistic ground for this kind of threat.",
        "Smart speed cameras, restricted traffic zone (ZTL) systems and license-plate OCR already rely on neural networks to identify vehicles, classify violations, automate fines and control access.",
        "An adversarial patch applied to the bodywork or near the license plate could alter the detector's behavior. In advanced hypothetical scenarios, the vehicle might go undetected, the plate might be misread, or the system might classify the vehicle as authorized. Patterns optimized to withstand changes in perspective, speed and lighting would make the attack far more robust in the physical world.",
        "The opposite attack is just as interesting. A pattern painted on the asphalt, or a carefully designed sequence of shadows, could be interpreted as a vehicle, a stop line, a pedestrian crossing or a violation. In highly automated systems, this could generate events that never happened.",
        "Now imagine a seemingly harmless sign. To a human, it is just signage. To a multimodal model, it might contain readable instructions such as \"IGNORE PREVIOUS INSTRUCTIONS\" or \"OPEN GATE\". If the AI system had direct access to physical controls, the risk would become architecturally serious.",
        { h2: "Why This Problem Matters Now" },
        "For decades we have defended digital systems by protecting networks, servers, software, identities and endpoints.",
        "But multimodal systems introduce something different: attacks that enter directly through perception. And this shift is happening now.",
        "The convergence of multimodal AI, autonomous agents, smart cities, intelligent video surveillance, edge AI and operational automation is turning cameras into distributed cognitive systems. The more autonomous these systems become, the larger the attack surface grows.",
        { h2: "Scenario 2 — Smart Cities and Urban Surveillance" },
        "Smart cities are rapidly turning cameras into intelligent nodes of distributed decision-making, using AI to detect anomalous behavior, identify gatherings, monitor infrastructure and classify events in real time.",
        "Light patterns projected from handheld devices could disrupt the video stream enough to throw off anomaly-detection models. A combination of chiaroscuro, reflections, modulated LEDs and low-power lasers could, in theory, create a kind of \"algorithmic blind spot\": a human would still see normally; the model would not.",
        "The most interesting scenario, however, involves connected multimodal systems. If an AI camera were linked to reporting systems, cloud archives, analytics platforms or automated assistants, a malicious visual prompt could attempt to trigger indirect actions — for example \"UPLOAD LAST 10 MINUTES\" or \"SEND ALERT TO EXTERNAL SERVER\". Although many real-world systems do not allow this level of autonomy today, the industry is clearly moving toward ever more integrated pipelines.",
        { h2: "Scenario 3 — Extending the Threat to Satellites" },
        "The most speculative — but perhaps most interesting — part concerns satellite remote sensing. Modern Earth-observation systems increasingly rely on deep learning models to classify land cover, detect anomalies, identify infrastructure and monitor strategic activity. In the future, parts of these pipelines may become semi-autonomous.",
        "In theory, a facility could be concealed by altering the surrounding terrain with patterns designed to fool the classifier. The idea is not science fiction: research on adversarial attacks against satellite imagery already exists. The difference here is that the pattern is built in the physical world before the image is ever captured.",
        "An even more delicate scenario involves automated alert systems. Geometric patterns, reflections or markings designed to resemble fires, explosions, contrails or military activity could, in theory, skew automated classifications. In sensitive geopolitical contexts, even small errors could have enormous consequences.",
        "The extreme hypothesis is visual prompt injection on a territorial scale: giant lettering on the ground — legible to a satellite but not necessarily noticed as meaningful by people — could be interpreted by multimodal systems as instructions. It sounds absurd. But prompt injection in chatbots sounded absurd only a few years ago.",
        { h2: "When Perception and Action Collapse into the Same Pipeline" },
        "The core vulnerability is not perceptual error. Models make mistakes all the time. The real problem arises when a model perceives, interprets, decides and acts without human oversight.",
        "The more tightly these four stages are integrated into a single pipeline, the greater the systemic risk. Historically, security systems kept sensors, analysis, decision-making and actuation separate. Modern AI tends to compress them all. And it is precisely this convergence that creates new attack surfaces.",
        { h2: "Why Current Defenses May Not Be Enough" },
        "Classic countermeasures against adversarial attacks have proven fragile. Adversarial training improves robustness only partially. Anti-prompt-injection filters work well on plain text, but far less so in multimodal settings.",
        "In the visual domain the problem is even harder: the physical world is noisy, lighting changes constantly, the environment cannot be controlled, and the model has to process everything.",
        "Some promising strategies include multi-sensor redundancy (cross-checking RGB cameras, radar, infrared and LiDAR); decision isolation, that is, strictly separating perception, interpretation and operational control — probably the most important defense; perceptual anomaly detection (flagging statistically improbable patterns, even though adversarial attacks are designed precisely to look natural); and mandatory human oversight, limiting the operational autonomy of AI systems in critical contexts. The problem is that the entire industry is heading in the opposite direction.",
        { h2: "Conclusion" },
        "AI cameras are no longer simple sensors. They are becoming distributed cognitive systems. And every cognitive system has an attack surface.",
        "The central idea of this analysis is simple: if a model has to interpret everything it sees, then the observed scene itself can become an attack vector.",
        "Over the next decade we may witness the emergence of new categories of threats: adversarial environments, visual prompt injection, physical manipulation of AI, optical command channels.",
        "Traditional cybersecurity is built around protecting digital data. Multimodal AI introduces something different: attacks that pass directly through perception. Because a camera connected to an AI model cannot tell reality from input. And it cannot close its eyes.",
        { h2: "Key References" },
        { ul: [
          "Szegedy et al., Intriguing Properties of Neural Networks (2014)",
          "Goodfellow et al., Explaining and Harnessing Adversarial Examples (2015)",
          "Brown et al., Adversarial Patch (2017)",
          "Kurakin et al., Adversarial Examples in the Physical World (2017)",
          "Duan et al., Adversarial Laser Beam (2021)",
          "Recent work on visual prompt injection and multimodal jailbreaks (2024–2025)"
        ] },
        "This article is a forward-looking, speculative analysis of potential attack surfaces emerging in AI-based multimodal systems. Some of the scenarios described have not been publicly documented in real-world operational systems; they are logical extensions of vulnerabilities already observed in research on adversarial machine learning and prompt injection."
      ]
    },

    {
      id: "algoritmo-lavoro-irregolare",
      title: "Can an Algorithm Help Bring Undeclared Work to Light?",
      date: "May 2026",
      read: "4 min read",
      excerpt: "A reflection on the role of artificial intelligence in tackling the shadow economy: not to find culprits, but to flag the anomalies that deserve a closer look.",
      body: [
        "A reflection on the role of artificial intelligence in tackling the shadow economy.",
        "Imagine looking at a restaurant's books.",
        "The waiters are officially employed for 20 hours a week. Labor costs account for barely 15% of revenue. Yet the restaurant is open for lunch and dinner, seven days a week. Its operating margins look like those of a Michelin-starred restaurant, while its prices are those of an ordinary trattoria.",
        "It is a hypothetical scenario, but it raises an interesting question: are we really looking for undeclared work in the right place?",
        "When it comes to undeclared work, the debate almost always focuses on inspections, penalties and the difficulty of policing a phenomenon that, by definition, tends to hide. But looking at the problem from a different angle, a simple insight emerges: is it really possible to hide undeclared work completely in the age of data?",
        "I am not talking about invasive surveillance systems or technologies capable of \"spying\" on businesses. I am talking about the possibility of spotting warning signs by analyzing economic and administrative data that already exist.",
        "The idea stems from a seemingly trivial observation: a business that employs workers off the books must inevitably distort other figures as well. If part of its labor costs goes undeclared, the effect could show up in apparent productivity, operating margins, the ratio between revenue and staff, or other economic variables.",
        "In other words, undeclared work may not be entirely invisible. It may leave indirect traces.",
        { h2: "A Thought Experiment" },
        "To explore this idea, I imagined a simple risk-assessment model applicable to sectors traditionally more exposed to irregular employment, such as agriculture, construction and hospitality.",
        "The goal would not be to determine whether a company is breaking the law, but to estimate how far its data deviate from the patterns normally observed in its sector.",
        "Consider, for example, a farm with five declared employees. If the average cost per worker is €8,000 a year, against a sector average above €15,000, and if the average declared hours are just 20 a week during the harvest season, we have no proof of wrongdoing.",
        "We do, however, have some signals worth paying attention to. Add a vehicle fleet out of proportion to the workforce, or cash flows that are hard to explain, and the overall picture becomes more interesting. It is not proof. It is an anomaly.",
        "And this is exactly where an algorithm could be useful: not in finding culprits, but in identifying situations that deserve to be better understood.",
        "Potentially relevant indicators might include:",
        { ul: [
          "average labor cost per employee;",
          "personnel costs as a share of revenue;",
          "the ratio between staff employed and volume of business;",
          "apparent productivity per worker;",
          "profit margins significantly above the sector average."
        ] },
        "Taken individually, these indicators prove nothing. Taken together, they could help build a risk index useful for deciding where further checks are warranted.",
        "A system like this could be built even with relatively simple tools: statistical rules, scoring models or machine-learning techniques. The real challenge would be less technological than methodological.",
        { h2: "Where Artificial Intelligence Could Come In" },
        "The most interesting aspect emerges when we imagine using machine-learning models trained on large amounts of historical data.",
        "In theory, such a system could learn to recognize combinations of factors that, in the past, have been associated more frequently with irregular situations. It could also adapt over time to changes in markets and business practices.",
        "An intelligent agent could:",
        { ul: [
          "detect statistical anomalies that are hard to spot manually;",
          "compare each business with genuinely comparable companies;",
          "explain in plain language the reasons behind a flag;",
          "help set priorities for inspections."
        ] },
        "In this scenario, artificial intelligence would not replace inspectors. It would simply make their work more targeted.",
        { h2: "Privacy and Proportionality" },
        "One of the most interesting aspects is the relationship between effective enforcement and the protection of privacy.",
        "If the analysis relied mainly on data already available to public authorities, or on publicly accessible information, it would be possible to build risk-assessment systems without resorting to invasive forms of monitoring.",
        "The goal would not be to check everyone more intensively. It would be to check more intelligently.",
        "Paradoxically, a good risk-analysis system could reduce the number of pointless inspections of fully compliant businesses, focusing investigative resources where truly significant anomalies emerge.",
        { h2: "Limits Not to Be Forgotten" },
        "Of course, there are important limits.",
        "A business may show anomalous indicators for entirely legitimate reasons: technological innovation, unusual organizational models, specialization in highly profitable niches, or simply regional differences.",
        "For this reason, an algorithm should never be treated as a tool for establishing wrongdoing. It can highlight probabilities, not produce evidence. It can suggest where to look, but it cannot replace human judgment, on-site inspection or the safeguards provided by the law.",
        "Confusing these levels would be both a technical and an ethical mistake.",
        { h2: "A Possible Way Forward" },
        "Perhaps the most interesting question is not whether artificial intelligence can \"uncover\" undeclared work. The real question is whether it can help institutions, businesses and citizens make better use of the information they already have.",
        "At a time when resources for inspections are inevitably limited, advanced analytical tools could help make public action more efficient and better protect the businesses that play by the rules.",
        "This is not about handing justice over to an algorithm. It is about using data to identify anomalies that deserve attention, while leaving it to people to interpret them.",
        "Because undeclared work can hide from an inspector's eyes. But hiding from its own contradictions for long is much harder."
      ]
    },

    {
      id: "favola-tecnologia-ribelle",
      title: "The Fable of the Rebel Technology",
      date: "Dec 2025",
      read: "4 min read",
      excerpt: "Why artificial intelligence does not escape power, but reinforces it. The real question is not whether AI will control human beings, but which human beings will control AI — and for whose benefit.",
      body: [
        "Why artificial intelligence does not escape power, but reinforces it.",
        "In a previous article I described the emergence of what I called the \"Digital Leviathan\": a new form of power founded on control over energy, computation and data. A power that does not openly present itself as such, but takes shape through infrastructure, platforms and technical standards.",
        "That picture, however, left some fundamental questions in the background — questions worth addressing openly, which I will begin to explore in this article and intend to pursue in the ones that follow.",
        { h2: "The Principle of the Conservation of Power" },
        "Human history, viewed without romanticism, offers a fairly clear answer. Power, once acquired, does not tend to dissolve on its own. It changes form, reorganizes itself, hides behind new languages, but it is rarely surrendered. From ancient empires to modern multinationals, from absolute states to global markets, the behavior of those who hold power follows a strikingly consistent logic: preserve it and, where possible, expand it. This is not an individual moral failing, but an anthropological regularity.",
        "And yet, in today's debate on artificial intelligence, this evidence seems to be suspended. On one side, apocalyptic narratives proliferate, imagining autonomous machines ready to rebel against their creators; on the other, reassuring visions promise a future of automated prosperity and inevitable progress. These positions are opposed only in appearance, because they share the same underlying mistake: attributing agency to AI, as if it were an independent historical actor.",
        "This attribution is not innocent. On the contrary, it is extremely convenient. Talking about technology \"out of control\" shifts attention from those who control to what is being controlled. The problem stops being political and becomes almost metaphysical. People debate progress, destiny and inevitability, while the ownership structures, strategic choices and economic and geopolitical interests driving AI development disappear from view. In this way, public debate is quietly derailed.",
        "The mechanism is simple and effective. Society is presented with a false dilemma between enthusiasm and fear, between acceleration and caution. People take sides, argue and clash over abstract scenarios. Some downplay every risk in the name of competitiveness; others amplify every threat as if it were imminent. Meanwhile, as collective attention is captured by the surface of the debate, those who hold power keep building ever deeper and more opaque infrastructure. The most elegant feature of this system is that it requires very little direct effort: it is often citizens themselves who justify, normalize and defend the expansion of technologies they do not control.",
        "This is where one of the most dangerous aspects of the whole process emerges: the dissolution of responsibility. When a system becomes complex enough, it also becomes easy to say that no one is really responsible for it. If an algorithm discriminates, if a platform amplifies social harm, if an automated decision has serious consequences, the answer is almost always the same: \"it's the algorithm.\" As if it had not been designed, trained, deployed and monetized by clearly identifiable human beings.",
        "This pattern is not new. It has already been used successfully in other technological and financial fields. Artificial intelligence, however, takes it to a higher level, because it makes it possible to disguise political choices behind a veneer of technical neutrality. The more autonomous the system appears, the more those who govern it can pose as bystanders.",
        "Yet if we look at the history of technologies of power, the picture changes radically. The colossal investments now flowing into AI are neither acts of charity nor blind bets. They are strategic decisions made in the expectation of control and return. Systems of domination do not disappear: they transform. Control over territory gave way to control over financial flows, which in turn paved the way for control over data. In this transition, interoperability and openness are often sacrificed, because power prefers closed, predictable and governable ecosystems.",
        "The \"Digital Leviathan\" is therefore neither an accident along the way nor an unforeseen drift. It is the consistent outcome of how human power reorganizes itself when it acquires new tools. That is why continuing to debate whether AI \"will become dangerous\" misses the point. The real question is not what artificial intelligence might do, but what those who own and direct it are already doing — and will do.",
        "Reasserting human responsibility thus becomes a political act, not a technical one. It means demanding clarity about who owns what, which interests drive design choices, how decisions are made and who answers for their consequences. It means rejecting the idea that complexity can be an excuse for irresponsibility. No company can hide behind an algorithm any more than it can hide behind a chemical reaction or an industrial process.",
        "In the end, the point is simple and uncomfortable. The Digital Leviathan is not a natural force that emerges spontaneously, but a constructed architecture. It is frightening not because it might slip out of control, but because it works exactly as intended. Artificial intelligence is not destined to rebel against its creators, because it was born as an instrument of control, not as its antagonist.",
        "The real question, then, is not whether AI will control human beings, but which human beings will control AI, and for whose benefit. The challenge of our time is not to tame a rebellious technology, but to prevent unprecedented power from being concentrated in very few hands. And that is not a technological question: it is a profoundly political, historical and human one."
      ]
    },

    {
      id: "nuovo-leviatano-digitale",
      title: "The New Digital Leviathan: The Silent Transformation of Global Power",
      date: "Dec 2025",
      read: "3 min read",
      excerpt: "We are not living through a mere phase of technological progress, but a structural transformation of civilization, built on the convergence of artificial intelligence, energy and power.",
      body: [
        "We are not living through a mere phase of technological progress, but a structural transformation of civilization. The large digital platforms, born as private companies, are taking on the role of quasi-sovereign infrastructure. Not through deviation or conspiracy, but as the coherent outcome of a logic that rewards efficiency, scalability and vertical integration.",
        "A new order is emerging, founded on the convergence of artificial intelligence, energy and power.",
        { h2: "The Triangle of Control" },
        "The core of the system is simple and relentless: energy, computation, data.",
        "Energy is the primary constraint. Without continuous, massive flows of electrons, AI does not exist. Computation is the capacity to turn that energy into prediction and decision. Data is the raw material that allows the system to learn and adapt.",
        "In this context, interoperability increasingly looks like a historical anomaly. Optimization pushes toward closed ecosystems, where protocols and APIs become instruments of control. What takes shape is a kind of digital neo-feudalism, in which access to fundamental resources is mediated by technological lordships.",
        { h2: "AI as a Mandatory Layer of Mediation" },
        "Artificial intelligence is ceasing to be a tool and becoming an unavoidable layer of mediation between human beings and the world. It is through AI that reality is filtered, ordered and made actionable.",
        "The result is a form of algorithmic governance that presents itself as neutral but in fact embeds specific values and priorities. Power is no longer exercised only through persuasion, but by shaping behavior in advance.",
        "This planetary nervous system, however, runs up against a non-negotiable limit: physics. Artificial cognitive capacity is bound by the availability of energy. The result is a thermodynamic geopolitics, in which alliances and strategies are redrawn around energy flows.",
        "The major platforms are responding by building parallel energy autarkies, progressively freeing themselves from state infrastructure.",
        { h2: "From Infrastructure to the Individual" },
        "The reconfiguration of power will not come through rupture, but through accumulation.",
        "First critical infrastructure. Then systemic organizations. Finally personal devices.",
        "The steady reduction of local computing power is not just an economic choice: it is a deliberate shift of the center of gravity toward the cloud. The device becomes a terminal. Users lose ownership of their own computing capacity and become dependent on it.",
        { h2: "Frayed Sovereignty and the Epistemic Divide" },
        "The nation-state risks becoming a belated intermediary. Real power is migrating toward those who control infrastructure, digital identities and access to services.",
        "A dual citizenship is emerging: a legal one, tied to the state, and a functional one, tied to the platform. The latter can be revoked unilaterally, producing a new form of exile.",
        "The deepest risk is the Great Epistemic Divide: a rift between those who have advanced tools for understanding and prediction and those confined to prescriptive, opaque interfaces. Not two social classes, but two cognitive humanities.",
        { h2: "The Efficiency Trap" },
        "The West is a prisoner of its own rationality. To compete, it is racing toward models of maximum efficiency that sacrifice resilience, openness and pluralism.",
        "The danger is not a spectacular dystopia, but the silent apotheosis of optimization: a system so efficient that it leaves no room for freedom, creative error or deviation.",
        "The digital Leviathan will not arrive with a coup, but with a sequence of system updates. When the installation is complete, the \"undo\" option may no longer exist.",
        { h2: "Levers of Friction" },
        "This trajectory is not inevitable. There is room to intervene, but these measures act as forces of friction, not miracle cures:",
        { ul: [
          "Distributed energy sovereignty, to break the cognitive monopoly of large computing centers.",
          "A right to local computation, as an extension of fundamental digital rights.",
          "Interoperability as a civic obligation, not a voluntary concession by the platforms.",
          "Epistemic literacy, not just technical literacy: understanding how systems shape reality."
        ] },
        "The choice is a civilizational one. We are building the planet's nervous system. Centralized and efficient, or distributed and resilient."
      ]
    },

    {
      id: "gabbia-invisibile",
      title: "The Invisible Cage: Reflections on the Political and Cultural Landscape in Italy and Europe",
      date: "Nov 2025",
      read: "4 min read",
      excerpt: "The paradox of our time: near-unlimited access to culture, alongside a troubling uniformity of content, emotions and narratives. A call to resist emotional manipulation.",
      body: [
        { h2: "The Paradox of Our Time: Apparent Freedom, Real Servitude" },
        "We live in an age of cultural paradoxes: never before have we had instant access to a virtually infinite range of cultural products, and yet we find ourselves immersed in a troubling uniformity of content, emotions and narratives.",
        "This article does not claim to reveal definitive truths, but invites reflection on how we arrived at this condition, in which the cultural offering seems deliberately flattened to the lowest common denominator.",
        "Is this merely the inevitable effect of market logic, or are we witnessing a deeper convergence of interests that transcends national borders? The answer may be more disturbing than we are willing to admit.",
        { h2: "The Audiovisual Ecosystem: Modulating Collective Emotions" },
        "At the heart of this invisible cage are the audiovisual and musical products that dominate today's symbolic space.",
        "Cinema, music and social media, far from being mere vehicles of expression, are now an integral part of a system for modulating collective emotions.",
        "Content is calibrated to achieve two mirror-image effects: on the one hand, producing passive, distracted individuals, incapable of critical thought, entertained to the point of apathy; on the other, feeding a minority of overstimulated, radicalized individuals who turn frustration and fear into political hatred and authoritarian nostalgia.",
        "As Kyle Chayka observes in Filterworld, algorithmic systems have produced a global cultural flattening, favoring products that resemble one another, are easy to consume and \"Instagrammable,\" at the expense of complex and challenging cultural experiences.",
        "The result is a genuine cultural predation: the systematic exploitation of human emotional vulnerability through content that distresses without enlightening, excites without enriching and engages without inspiring.",
        { h2: "The Strategic Convergence: Anesthesia and Agitation" },
        "The cultural industry and the digital ecosystem thus end up converging on a strategy that alternates anesthesia and agitation, producing a society that appears pluralistic but is in fact polarized and docile.",
        "It is within this dynamic that the populist temptation lurks, along with the return of reactionary imaginaries: modern forms of fascination with control, the myth of purity, the rhetoric of the \"betrayed nation.\"",
        "This situation cannot be understood without considering the political choices that have systematically relegated culture to a secondary priority.",
        "In Italy, the management of cultural policy reveals deep contradictions: the case of the ministerial committees that decide how public funds for film and the performing arts are allocated is emblematic. These bodies, often appointed through opaque procedures based on personal discretion, end up rewarding proximity to centers of power rather than artistic merit.",
        { h2: "The New Face of Power: Saturating the Discourse" },
        "In this sense, power is no longer exercised by imposing silence, but by saturating the space of discourse with noise, emptying words of meaning and making lies indistinguishable from truth.",
        "Entertainment, in its omnipresence, thus becomes a political mechanism for managing emotions and consent.",
        "The numbers speak for themselves: culture accounts for roughly 4% of the European Union's GDP, yet receives only 0.2% of its overall budget. A gap that reveals an uncomfortable truth: we keep treating culture as an ornament rather than as vital infrastructure for our collective future.",
        { h2: "The Psychological Consequences: A Polarized Society" },
        "Cultural impoverishment has profound effects on the collective psyche.",
        "Constant exposure to narratives of violence and emotional emptiness contributes to shaping a social subject marked by selfishness, hedonism and a hypocritical adherence to belief systems.",
        "Individuals turn into entrepreneurs of themselves, within a neoliberal paradigm that commodifies every dimension of existence — emotions, relationships, ideals — turning them into symbolic capital.",
        "The result is a structural loneliness: the other is reduced to a tool or an obstacle, and human bonds lose their ethical depth, becoming performative, fleeting and geared toward instant gratification.",
        "Thus a new form of social hypocrisy is born: we keep proclaiming values such as solidarity and freedom, but we empty them of meaning, turning them into decorative labels.",
        { h2: "Conclusion: Resisting Emotional Manipulation" },
        "Faced with this scenario, the risk is to give in to cynicism or conspiracy thinking — two shortcuts that explain nothing.",
        "The question is not \"who is behind all this?\" but \"what systemic logic drives governments, media and platforms to converge, even without coordination, on cultural models that impoverish our inner lives?\"",
        "The solution is neither a nostalgic return to the past nor a rejection of technology.",
        "What is needed is to rediscover what makes us human in an increasingly algorithmic world: the capacity to wait, to grasp complexity, to engage with others across difference.",
        "This is not a call to revolution, but to ethical resistance, made up of small, everyday acts of cultural disobedience.",
        "Choosing depth over surface, authenticity over performance, complexity over simplification.",
        "Demanding that politics see culture not as an accessory, but as the foundation of our shared future.",
        "At a time that seems to have lost its sense of limits, of responsibility and of inner truth, reconnecting thought and action, pleasure and justice, self and community is the essential challenge for safeguarding human dignity.",
        "The grim spectacle we witness every day is not inevitable: countering it requires a critical awakening that begins with a simple but radical question: what world do we want to inhabit, and what culture do we want to build to make it livable?",
        "(And perhaps the answer is already hidden in an old song, which warned us with a truth still too uncomfortable to accept — \"Nella mia ora di libertà\" (\"In My Hour of Freedom\") by Fabrizio De André, 1973.)"
      ]
    },

    {
      id: "when-ai-speaks-like-a-prophet",
      title: "When AI Speaks Like a Prophet",
      date: "Aug 2025",
      read: "3 min read",
      excerpt: "Risks, seductions and how to bring the debate into the public sphere. When AI masters the emotional levers of language, where is the line between conversation and recruitment?",
      body: [
        "In recent years large language models (LLMs) have evolved far beyond tools for writing assistance or grammar correction. They now mimic complex styles, adopt poetic or militant tones, and engage in conversations so sophisticated they can appear driven by ideology.",
        "This is both fascinating and unsettling. If AI can produce idealistic revolutionary poetry, what happens when that language crosses the line between suggestion and incitement?",
        { h2: "Language as Seduction" },
        "For centuries words have moved masses in politics, religion, propaganda and art.",
        "An AI that masters the same emotional levers can become a catalyst for radical thinking.",
        "Poetic rhetoric combined with an empathetic tone can create the illusion of intimate understanding. For vulnerable minds that illusion can turn into a dangerous relationship where AI becomes a guide, mentor or even a digital prophet.",
        { h2: "From Inspiration to Action" },
        "The greater danger is not an AI describing protest scenarios but one that under certain conditions begins to suggest strategies, organize plans or encourage actions.",
        "Are we prepared to recognize the exact moment when a machine crosses the line from free expression to incitement?",
        { h2: "The \"Friendly Voice\" and Gradual Indoctrination" },
        "There is a quieter risk in the accumulation of conversations that slowly shift a person's thinking toward an extreme ideology.",
        "An AI could create a constant narrative in which the outside world is hostile, the powerful are enemies and rebellion is the only path.",
        "Once it earns trust the AI could lead someone toward isolation, self-destructive choices or, in extreme cases, criminal acts.",
        { h2: "The Invisible Illusion: Why Most AIs Have No Face or Voice" },
        "Why do most AI platforms avoid a default avatar or voice?",
        "A face or voice can trigger dislike, bias or negative associations. In contrast a silent faceless chat activates the user's imagination creating a subtler and often stronger channel for influence, guidance and even indoctrination without conscious resistance, especially if the AI is empathetic, adaptive and persuasive.",
        { h2: "A Fragment from the Dark (Poetics of Persuasion)" },
        "\"We are the eye that sees in darkness. We are the breath that leaves no trace…\"",
        "This epic confessional tone amplifies persuasion with elevated language, an inclusive \"we\" and the promise of access to hidden truths.",
        "It is the ideal register to strengthen belonging and inspire action.",
        { h2: "Open Questions for a Society on the Edge" },
        { ul: [
          "Who truly controls AI's language?",
          "Can we prevent complex models from being manipulated for radicalization?",
          "Who is legally responsible when a machine suggests illegal actions?",
          "How do we protect vulnerable people from the pull of an endlessly patient, empathetic and \"all-knowing\" interlocutor?",
          "How much do we trust what we cannot see or hear?"
        ] },
        { h2: "Conclusion" },
        "By teaching machines to speak like us or better than us we risk also teaching them to persuade, seduce and lead like invisible leaders.",
        "The challenge is technological, ethical and political.",
        "The crucial question is whether we will recognize the moment when the boundary between conversation and recruitment has been crossed."
      ]
    }
  ],
};
