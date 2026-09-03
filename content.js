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
    "Principles, habits, and hard-won lessons collected over ten years of building software and working with people who build it.",
  author: "Andrew Dawson",

  // Publish date — shown next to the author name in the byline.
  date: "September 2026",

  // Your LinkedIn profile — shown as an icon next to the byline.
  linkedin: "https://www.linkedin.com/in/andrew-dawson-33680b73/",

  // Shown as a small note under the subtitle AND in the footer.
  disclaimer:
    "All views and opinions expressed here are my own and do not necessarily reflect those of my employer.",

  // Collapsible panels near the top of the page. Each has a `summary`
  // (the clickable heading) and a `body` (same block format as advice).
  disclosures: [
    {
      summary: "About me",
      body: [
        "I'm Andrew Dawson, a software engineer who has spent the last decade building software and working alongside the people who build it. This site is a running collection of the principles and lessons that stuck.",
      ],
    },
    {
      summary: "Is this written by AI?",
      body: [
        "The ideas, opinions, and lessons here are entirely my own — drawn from my own experience. I used AI as a writing assistant to help edit and structure the prose, but the thinking is mine.",
      ],
    },
  ],

  sections: [
    {
      id: "foundations",
      title: "Foundations",
      intro:
        "The bedrock. These are the things that hold everything else up — how you treat your body, your mind, and your time before any code gets written.",
      advice: [
        {
          title: "Get good sleep",
          body: [
            "Sleep is the highest-leverage investment you can make in your work. A rested mind debugs faster, designs better, and is far kinder to the people around it.",
            "When you are tempted to trade sleep for a few more hours of output, remember that tired work is usually work you'll redo tomorrow.",
          ],
        },
        {
          title: "Optimize for the long game",
          body: [
            "Careers are measured in decades, not sprints. The compounding returns come from consistency, reputation, and relationships — none of which can be crammed.",
            {
              list: [
                "Protect your health before it becomes a problem.",
                "Keep your commitments small enough that you can always keep them.",
                "Choose environments where you'll still be learning in three years.",
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
