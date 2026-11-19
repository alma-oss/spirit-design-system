#!/usr/bin/env python3
"""Regression tests for the Baseline snapshot updater."""

from __future__ import annotations

import unittest

import update_baseline as updater


class UpdateBaselineTests(unittest.TestCase):
    def test_index_update_stays_inside_matching_entry(self) -> None:
        index = """### [a.css](layout/a.css)
No Baseline line here.

### [b.css](layout/b.css)
- Baseline: old
"""
        self.assertEqual(
            updater.replace_index_status(index, "layout/a.css", "new"),
            index,
        )

    def test_index_update_replaces_only_matching_status(self) -> None:
        index = """### [a.css](layout/a.css)
- Baseline: old-a

### [b.css](layout/b.css)
- Baseline: old-b
"""
        updated = updater.replace_index_status(index, "layout/a.css", "new-a")
        self.assertIn("- Baseline: new-a", updated)
        self.assertIn("- Baseline: old-b", updated)

    def test_support_requires_available_implementation(self) -> None:
        feature = {
            "browser_implementations": {
                "chrome": {"status": "preview", "version": "152"},
                "firefox": {"status": "available", "version": "150"},
                "safari": {"status": "unavailable"},
            }
        }
        self.assertEqual(
            updater.support_text(feature),
            "Chrome —, Firefox 150+, Safari —",
        )


if __name__ == "__main__":
    unittest.main()
