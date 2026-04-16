# Response Templates for PR Review Comments

Professional communication patterns for responding to different types of review feedback.

## Status Indicators

Always start with a clear status indicator:

- ✅ **Fixed** - You implemented the suggestion
- ⚠️ **Addressed** - You did part of it, with clear explanation of why
- ❌ **Not addressed** - You're declining, with clear reasoning
- ❓ **Clarification** - You're asking for more information

## Accepting Suggestions

### Simple Fix
```markdown
✅ Fixed: Added input validation as suggested.
Commit: abc123d
```

### Fix with Context
```markdown
✅ Fixed: Added the validation check on line 45. This prevents the null
reference error you identified in the error logs.
Commit: abc123d
```

### Fix with Multiple Changes
```markdown
✅ Fixed: Addressed your feedback across two commits:
- abc123d: Added input validation to `validateUser()` function
- def456e: Updated error message to be more descriptive

Both changes ensure the endpoint handles invalid input gracefully.
```

### Fix That Required Refactoring
```markdown
✅ Fixed: Implemented your suggestion with a small refactoring. I extracted
the validation logic into a reusable utility (`utils/validators.ts:42`) so
it can be shared across endpoints. This also fixes the duplication issue
noted in #456.

Commits: abc123d, def456e
```

## Partial Acceptance

### Implementing Part of Suggestion
```markdown
⚠️ Addressed: Added the input validation you suggested (commit abc123d).
However, I kept the error response status as 400 instead of 422 for
consistency with our existing error handling convention (see
`middleware/errorHandler.ts:78`). Happy to switch if the team prefers 422.
```

### Accepting Spirit but Different Implementation
```markdown
⚠️ Addressed: Improved the error messages as you requested. Rather than
adding nested try-catch blocks, I used our error handler middleware pattern
(see line 42 in `middleware/errorHandler.ts`) for consistency. The result
is more maintainable and follows our established patterns.

Commit: abc123d
```

### Accepting for Future, Not This PR
```markdown
⚠️ Noted: Your suggestion about caching is great, but it's beyond this PR's
scope. This PR focuses on the API endpoint logic. I've opened #567 to track
caching strategy for future work. For now, this PR doesn't add caching but
doesn't block it either (we can add it later without major changes).
```

### Implementing with Trade-Off Explanation
```markdown
⚠️ Addressed: Added the recursive validation logic you suggested. This will
catch deeper nesting issues. However, note that it has O(n) complexity vs
the previous O(1) approach. For most cases this is fine, but very large
nested objects could see a slight performance hit. We can optimize further
if needed (tracked in #789).

Commit: abc123d
```

## Declining Respectfully

### Out of Scope
```markdown
❌ Not addressed: This is a great suggestion, but it's beyond this PR's
scope. This PR focuses on pagination only. I've opened #456 to track
improving error messages across all endpoints. Let's keep this PR focused
on the original objective.
```

### Architecture/Design Decision
```markdown
❌ Not implemented: I understand your concern, but this is handled by the
authentication middleware which runs before this code (see
`middleware/auth.ts:67`). Adding additional checks here would create
duplication and make the code harder to maintain.

If you believe the middleware approach is wrong, let's discuss it separately
so the whole project can benefit from the decision.
```

### Disagree with Suggestion
```markdown
❌ Not implemented: I don't think this is the right approach. The issue
with caching here is that we don't have TTL semantics - data could become
stale between cache writes and reads. We'd need distributed invalidation
which is complex and tracked separately in #789.

The profiling data in #750 shows the bottleneck is actually the database
query (not API response serialization). Let's focus on that instead.

I'm open to discussing if you see this differently!
```

### Suggestion Creates Regression
```markdown
❌ Not addressed: Adding this check would break the existing behavior for
legacy clients (tracked in #456). We can't change this without a
deprecation period. I've added a comment in the code explaining why this
check isn't here.

Let's discuss a migration path in #789 if you think this is important.
```

### Already Implemented
```markdown
❌ Not needed: This is already implemented in the parent class at line 42.
The subclass inherits this behavior automatically. The tests at
`tests/inheritance.test.ts:123` verify this works correctly across all
subclasses.
```

### Disagree but Open to Persuasion
```markdown
❌ Not convinced: I see your point, but I'm not sure this is the right
tradeoff. Here's my thinking:

**Your approach:** Explicit, easier to debug
**Current approach:** More concise, follows our convention

I lean toward consistency with existing code, but I could be convinced
otherwise. What does the team think? @person1 @person2
```

## Requesting Clarification

### Ask for More Details
```markdown
❓ Question: Could you clarify what you mean by "thread-safe"? Should this
handle concurrent calls, or just avoid mutation? The current approach
prevents mutation but doesn't lock across calls. I want to make sure I
understand your concern before implementing.
```

### Confirm Understanding
```markdown
❓ Clarification needed: Are you suggesting we add caching to the validation
function, or to the HTTP endpoint? Adding it to the function would cache
per-process, while endpoint-level caching would be shared across processes.
These have different tradeoffs. Which did you have in mind?
```

### Ask for Prioritization
```markdown
❓ Scope question: I can implement this suggestion, but it would push the PR
scope beyond just pagination. Would you prefer I:
1. Include this in the current PR (makes it bigger)
2. Address it in a follow-up PR
3. Skip it for now

What works best?
```

### Seek Guidance
```markdown
❓ Need guidance: I see three ways to implement your suggestion:

1. Add validation at the controller level (simple, follows pattern in
   `controllers/user.ts`)
2. Add validation middleware (more reusable, but more complex)
3. Add it in the model layer (catches all paths, but less flexible)

Which approach aligns with our project philosophy? I'm leaning toward #1
for simplicity, but want your input.
```

## Handling Conflicts

### Two Reviewers Suggest Different Approaches
```markdown
❓ Conflicting feedback: I appreciate both perspectives:

@reviewer1: Your approach is more explicit and easier to trace through
@reviewer2: Your approach is more concise and follows our convention

I've implemented @reviewer2's approach because it aligns with patterns in
`middleware.ts:42`. However, I'm open to switching if the team prefers
explicit clarity over consistency.

Can you both weigh in on the project preference?
```

### Reviewer Asks for Something That Would Break Existing Code
```markdown
❌ Risk: Implementing this suggestion would change the return type from
`User | null` to `User | undefined`, which would break existing callers
(at least 3 places I found via search).

Before I make this change, let's discuss:
1. Should we do a deprecation period?
2. Should we update all callers in the same PR?
3. Is this the right time to make this breaking change?

I'm happy to implement either way, just want to be intentional about it.
```

## Praising Feedback

### Acknowledge Valuable Feedback
```markdown
🙏 Great catch: I completely missed this edge case. Your analysis of the
race condition in the cache invalidation is spot-on. This would definitely
cause issues under concurrent load. Thank you for the thorough review!
```

### Thank for Thorough Review
```markdown
💯 Thanks for the detailed review: I appreciate how thoroughly you went
through this. Your suggestions improved the code significantly. I've
implemented all of them and the result is much cleaner than my original
approach.
```

## Error/Question Responses

### You Don't Understand the Suggestion
```markdown
❓ Need clarification: I don't fully understand this suggestion. Could you
provide a code example or point me to similar code in the project? I want
to make sure I implement it correctly.
```

### You Need More Time to Investigate
```markdown
❓ Under investigation: Let me dig into this more. This is a good point and
I want to make sure I understand the implications before responding. I'll
get back to you with an answer in the next hour.
```

### You Found a Misunderstanding
```markdown
✅ Fixed: I initially misunderstood your comment, but I see now. You're
pointing out the edge case where `null` and `undefined` behave differently.
I've fixed this by standardizing on `undefined` throughout the function.

Commit: abc123d
```

## Format Guidelines

### Keep It Concise
- Get to the point quickly
- Use bullet points for multiple items
- Avoid walls of text

### Use Relative Links
- Reference code: `middleware.ts:42`, `tests/user.test.ts:123`
- Reference issues: `#456`, `#789`
- Makes it easy for reviewers to check context

### Quote When Useful
```markdown
You wrote: "This should handle concurrent access"

I've added locking to ensure thread-safety. The lock is scoped to minimize
contention.
```

### Provide Evidence
- Link to existing code that shows the pattern
- Reference test files that verify the behavior
- Point to documentation that supports your decision

### Be Humble
- "I might be wrong" is okay
- "I don't fully understand" is better than guessing
- "Let's discuss" shows openness

## Anti-Patterns (Don't Do These)

### ❌ Dismissive
```markdown
WRONG: "That's not how we do things here."
RIGHT: "Our convention is to use the pattern in middleware.ts:42. That's
why I kept this approach."
```

### ❌ Defensive
```markdown
WRONG: "This is fine, I don't see the problem."
RIGHT: "I don't see the issue, but I might be missing something. Could
you help me understand your concern?"
```

### ❌ No Explanation
```markdown
WRONG: "✅ Fixed"
RIGHT: "✅ Fixed: Added validation in utils/validators.ts (commit abc123d)"
```

### ❌ Overly Long
```markdown
WRONG: "I appreciate your thorough review and want to explain in great detail
why I chose this specific implementation approach over other alternatives,
which I now realize I should have considered more carefully..."

RIGHT: "✅ Fixed: Implemented validation (commit abc123d). I kept the error
message generic for consistency with other endpoints (see middleware.ts:42)."
```

### ❌ No Clear Decision
```markdown
WRONG: "Maybe I could do this, or maybe I could do that..."
RIGHT: "❌ Not addressing: This creates duplicate validation. The auth
middleware handles this at line 42. If you think that's the wrong place,
let's discuss separately."
```

## Summary

Good review responses:
- ✅ Start with clear status indicator
- ✅ Are concise but complete
- ✅ Provide references and evidence
- ✅ Explain reasoning, not just "no"
- ✅ Open to discussion on important decisions
- ✅ Grateful for feedback
- ✅ Humble about uncertainty
- ✅ Professional and collaborative in tone
