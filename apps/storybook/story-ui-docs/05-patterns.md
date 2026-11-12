# Screen Patterns

## Login

```tsx
<Section elementType="div" size="large" containerProps={{ size: 'xsmall' }}>
  <Box padding="space-800" borderWidth="100" borderRadius="300">
    <form>
      <Stack spacing="space-600">
        <Heading elementType="h1" size="small">
          Sign in
        </Heading>
        <TextField id="login-email" label="E-mail" name="email" type="email" autoComplete="email" isRequired />
        <TextField
          id="login-password"
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          hasPasswordToggle
          isRequired
        />
        <Flex alignmentX="space-between" alignmentY="center" isWrapping spacing="space-400">
          <Checkbox id="login-remember" label="Remember me" name="remember" />
          <Link href="#">Forgot password?</Link>
        </Flex>
        <Button type="submit">Sign in</Button>
      </Stack>
    </form>
  </Box>
</Section>
```

## Settings

```tsx
<Section elementType="div" containerProps={{ size: 'medium' }}>
  <Stack spacing="space-800">
    <Heading elementType="h1">Settings</Heading>
    <Box padding="space-800" borderWidth="100" borderRadius="300">
      <Stack spacing="space-600" hasIntermediateDividers>
        <StackItem>
          <Toggle
            id="settings-email"
            name="emailNotifications"
            label="E-mail notifications"
            helperText="New replies and offers"
          />
        </StackItem>
        <StackItem>
          <Toggle id="settings-sms" name="smsNotifications" label="SMS notifications" />
        </StackItem>
        <StackItem>
          <Select id="settings-language" label="Language" name="language">
            <option value="cs">Čeština</option>
            <option value="en">English</option>
          </Select>
        </StackItem>
      </Stack>
    </Box>
    <ActionGroup>
      <Button>Save changes</Button>
      <Button color="tertiary">Cancel</Button>
    </ActionGroup>
  </Stack>
</Section>
```

## Empty State

```tsx
<EmptyState spacing="space-900">
  <EmptyStateSection>
    <Icon name="search" boxSize={40} />
  </EmptyStateSection>
  <EmptyStateSection>
    <Heading elementType="h2" size="small">
      No results
    </Heading>
    <Text>Try a different keyword or remove some filters.</Text>
  </EmptyStateSection>
  <EmptyStateSection>
    <ActionGroup alignmentX={{ mobile: 'stretch', tablet: 'center' }}>
      <ButtonLink href="#">Clear filters</ButtonLink>
    </ActionGroup>
  </EmptyStateSection>
</EmptyState>
```

`EmptyState` and `EmptyStateSection` take all `Stack` props. A one-off confirmation uses `Modal` with
`ModalDialog`, `ModalHeader`, `ModalBody` and `ModalFooter`; open it with `isOpen` state and close it in `onClose`.
