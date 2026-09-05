/* ============================================================================
 * content.js — THE ONLY FILE YOU NEED TO EDIT TO ADD CONTENT.
 * ============================================================================
 *
 * The whole site is generated from the `siteContent` object below.
 *
 * HOW TO ADD A NEW SECTION:
 *   Add another object to the `sections` array:
 *     {
 *       id: "unique-slug",           // used for the URL anchor + nav link
 *       title: "Section Title",
 *       intro: "A sentence or two describing what this section is about.",
 *       advice: [ ...pieces of advice... ]
 *     }
 *
 * HOW TO ADD A PIECE OF ADVICE:
 *   Add an object to a section's `advice` array:
 *     {
 *       title: "Get good sleep",
 *       body: [ ...blocks... ]
 *     }
 *
 * WHAT CAN GO IN `body` (an array of "blocks", rendered in order):
 *   - A plain string            -> a paragraph
 *   - { list: ["a", "b"] }      -> a bulleted list
 *   - { ordered: ["1", "2"] }   -> a numbered list
 *
 *   Inside any string you can use light formatting:
 *     **bold**, *italic*, `code`, and [links](https://example.com)
 *
 * HOW TO ADD A SECTION SKETCH (the image that opens each section):
 *   1. Make a pencil sketch on a plain WHITE background (see the prompt tip
 *      below) and save it as  sketches/<section-id>.png  — e.g. a section with
 *      id "foundations" -> sketches/foundations.png.
 *   2. Run:  python3 tools/prepare_sketches.py
 *      This drops the white background out, tints the marks with the site ink,
 *      and writes the transparent, page-ready image to images/<section-id>.png.
 *   The site stitches images/<section-id>.png in automatically, just under that
 *   section's title. No image yet? That section simply omits it.
 *
 *   Prompt tip for generating one: "a light, loose graphite PENCIL SKETCH of
 *   <subject>, on a plain white background, no color, no border, centered."
 *
 * That's it. Save the file and refresh the page.
 * ========================================================================== */

window.siteContent = {
  title: "Reflections on a decade in tech",
  subtitle:
    "In January 2027 my tech career turns one decade old, which felt like a good milestone to step back and summarize the things I’ve learnt.",
  author: "Andrew Dawson",
  date: "September 2026",
  linkedin: "https://www.linkedin.com/in/andrew-dawson-33680b73/",
  disclaimer:
    "All views and opinions expressed here are my own and do not necessarily reflect those of my employer.",
  disclosures: [
    {
      summary: "About me",
      body: [
        "My name is Andrew Dawson. I am a staff engineer at Stripe working on the database infrastructure team.",
        "These days I mainly focus on the foundational sharding abstractions that determine how API requests get distributed over Stripe's database fleet.",
        "Outside of work I like walks, podcasts, chess and trying to improve my mile time at Orangetheory Fitness."
      ],
    },
    {
      summary: "Why did I write this?",
      body: [
        "Primarily I am writing this for myself as a forcing function to reflect on (and durably capture) the things I've learnt over my time in tech.",       
        "Secondarily, I've been lucky to have mentors and managers who invested in my growth and pushed me beyond what I felt ready for - now I want to pay that forward."
      ],
    },
    {
      summary: "Is this written by AI?",
      body: [
        "This is not written with AI and nothing meaningful I write is. I use AI as a research assistant, grammar checker and to write code, but I think writing should be left to us humans.",
        "I find that the painstaking process of writing exposes gaps in my thinking that using LLMs to write cannot replicate. I also agree with [Marc Brooker's take that using LLMs in writing breaks a sort of social contract](https://brooker.co.za/blog/2026/06/18/my-blog-and-ai.html)."
      ],
    },
    {
      summary: "Are these affiliate links?",
      body: [
        "Absolutely not; I have no desire to make money from this post."
      ]
    }
  ],

  sections: [
    {
      id: "foundations",
      title: "Foundations",
      intro:
        "Fair warning - this first section (and much of the next section) gives general life advice that is not at all specific to building a career in tech. If you want to jump to the more tech-y advice, skip the first two sections. Having said that, I do believe the \"common sense\" advice in these first two sections is the most important in this post.",
      advice: [
        {
          title: "Get Good Sleep",
          body: [
            "Getting quality sleep is the best thing you can do for your performance. I have struggled with bouts of insomnia which prompted me to dive deep into practices to improve sleep quality. I am now religious about my sleep hygiene, and for the most part get great sleep.",
            {
              list: [
                "Wake up at exactly the same time each day, even on weekends.",
                "Get morning light in your eyes within 30 minutes of waking up, and if it's too dark when you wake up to do that, use a 10,000 lux lamp for 20 minutes.",
                "Don't drink caffeine after 11am and keep total intake low.",
                "Drinking alcohol, eating junk food, and not exercising are all bad for your sleep.",
                "Avoid eating close to bedtime - aim to have at least 3 hours between your last bite and bed.",
                "Consistent bedtime matters less than wake-up time, but stick to a bedtime wind-down routine that includes no screens for at least 60 minutes before bed and low-stimulation activities.",
                "Sleep in a cold, dark and quiet room.",
                "A night mask is a great investment ([Whoop](https://www.whoop.com/us/en/) makes a great one).",
                "Train your brain that bed means sleep. This means only using your bed for sleeping, and if you cannot sleep after 20 minutes, getting out of bed until you are ready to try again.",
                "Cognitive Behavioral Therapy for Insomnia (CBT-I) is the most effective long-term treatment for insomnia.",
              ],
            },
          ],
        },
        {
          title: "Exercise Nearly Daily",
          body: [
            "After getting quality sleep, exercise is the best thing you can do for your brain - prioritize it!",
            {
              list: [
                "Exercise improves memory, reduces stress and improves critical thinking. Your brain is way more effective when exercise is a part of your daily routine.",
                "Prioritize a consistent routine you can stick with for years.",
                "Treat your daily exercise like your most critical meeting of the day; the improved cognitive abilities resulting from exercise outweigh the productivity gains of an extra hour of work.",
              ],
            },
          ],
        },
        {
          title: "Be Systems Driven",
          body: [
            {
              list: [
                "Have some system by which you keep track of the top 1-3 most important things to do on a daily basis, weekly basis, and quarterly basis. Daily should level up to weekly goals and weekly should level up to quarterly goals. Have some form of accountability to make sure you are looking at these goals, reflecting and making adjustments. I have found the [Full Focus Daily Planner](https://fullfocusstore.com/products/full-focus-planner-linen) to be gold here.", 
                "Working on the right thing is higher leverage than just working harder, so make space for yourself to reflect on what you should be working on - journaling is a great tool here.",
                "Be intentional about how you want to distribute your time. Designing an ideal week and then building your schedule around that ideal week is a good tool here.",
                "Read the book [Atomic Habits](https://www.goodreads.com/en/book/show/40121378-atomic-habits), then follow the core principles such as habit stacking to build chains of habits, using small daily habits as leverage to extend/build habits, using cues/rewards to enforce habits etc… Small daily habits stacked together create huge changes.",
              ],
            },
          ],
        },
        {
          title: "Learn by Doing Hard Things",
          body: [
            {
              list: [
                "Learn by searching for and then diving into tasks that are at the edge of your ability and that have a clear way to measure success. Run a loop - what blind spots do I have, what hard problem can I take on in those blind spots, was I successful? Why or why not?",
                "It is easy to trick yourself into thinking you understand something after passively consuming it (e.g., reading a document). Figure out some way to test yourself on the material to really engage with it. For example, if you are reading a design document, read the problem statement section and then spend a half hour thinking about how you would solve the problem before reading the document. Then after reading the document have an internal debate with yourself on which approach is better and weigh the tradeoffs. You will remember the document so much better and provide better feedback.",
                "It is hard to remember random facts; it is easier to remember facts that connect to a mental model you deeply understand. Somewhat counter-intuitively, remembering relationships between concepts is easier than remembering isolated facts even though it is on net more total information - the chess grandmaster remembers where pieces are on a chess board not because they have a better general memory but because they have such rich mental models for how the pieces relate to each other.",
              ],
            },
          ],
        },
      ],
    },

    {
      id: "work-basics",
      title: "Work Basics",
      intro:
        "The everyday craft of being effective — how you communicate, prioritize, and turn ambiguity into shipped work.",
      advice: [
        {
          title: "Write things down",
          body: [
            "The act of writing forces clarity. If you can't explain it in a short document, you probably don't understand it yet.",
            "Written decisions also scale: they answer the same question for the next ten people without you in the room.",
          ],
        },
        {
          title: "Make the work visible",
          body: [
            "Good work that no one knows about is indistinguishable from no work at all — not because people are cynical, but because they simply can't act on what they can't see.",
            {
              list: [
                "Share progress before you're asked.",
                "Surface risks early, while they're still cheap to fix.",
                "Close the loop when something is done.",
              ],
            },
          ],
        },
      ],
    },

    {
      id: "staff-engineering",
      title: "Staff Engineering",
      intro:
        "Operating with leverage. At this altitude the job stops being about the code you write and starts being about the decisions and people you influence.",
      advice: [
        {
          title: "Choose the right problems",
          body: [
            "Seniority is largely the skill of working on the right thing. A brilliant solution to the wrong problem is still waste.",
            "Spend real time upstream — with users, with data, with the people who feel the pain — before committing the team to a direction.",
          ],
        },
        {
          title: "Multiply, don't just add",
          body: [
            "Your impact is no longer bounded by your own output. It's bounded by how much better you make everyone around you.",
            {
              list: [
                "Turn your one-off fixes into paved paths.",
                "Mentor deliberately, not just when asked.",
                "Leave designs and docs that let others move without you.",
              ],
            },
          ],
        },
      ],
    },
  ],
};
