# Postmortems

> A postmortem is a written record of an incident, its impact, the actions taken
> to mitigate or resolve it, the root cause(s), and the follow-up actions to
> prevent the incident from recurring.
>
> [Postmortem Culture: Learning from failure][learning-from-failure],
> _Devin Carraway_

For a full overview, check out the [Software Reliability Engineering book][sre-book] on this
topic.

## Process

- Copy the [Postmortem template][postmortem-template] over to a new file
- This file should be named: `YYYY-MM-DD-title.md`
  - For example: `2023-11-05-critical-layout-breaking-change.md`
- Fill out the template as best you can, be as detailed as needed
- Submit a Pull Request to the project, make sure to include anyone involved in
  the incident as a reviewer so they can provide additional perspectives if
  needed

[learning-from-failure]: https://landing.google.com/sre/sre-book/chapters/postmortem-culture/
[sre-book]: https://landing.google.com/sre/sre-book/chapters/postmortem/
[postmortem-template]: https://github.com/alma-oss/spirit-design-system/blob/main/docs/postmortems/0000-00-00-template.md
