import { Feature } from '@vx-feature'
import { useMemo, useState } from 'react'

import { useTheme, useColorScheme } from '@vx-hooks/Mantine/Ui'
import { Stack, Group, Space } from '@vx-components/Mantine/Layouts'
import { ColorSwatch } from '@vx-components/Mantine/Data'
import { Icon, SysIcon } from '@vx-components/Vixen'
import { Divider, ScrollArea } from '@vx-components/Mantine/Various'
import { Button } from '@vx-components/Mantine/Buttons'

import {
    NumberInput,
    NativeSelect,
    Switch,
    Checkbox,
} from '@vx-components/Mantine/Inputs'

function getCurrentSettings(getStateItemCopy) {
    return {
        vx_ui_scale: getStateItemCopy('vx_ui_scale'),
        vx_ui_color_scheme: getStateItemCopy('vx_ui_color_scheme'),
        vx_ui_color: getStateItemCopy('vx_ui_color'),
        vx_ui_icons: getStateItemCopy('vx_ui_icons'),
        vx_ui_font_family: getStateItemCopy('vx_ui_font_family'),
        vx_ui_font_family_monospace: getStateItemCopy(
            'vx_ui_font_family_monospace'
        ),
    }
}

function compareSettings(prevSettings, currentSettings) {
    for (const cle of Object.keys(prevSettings)) {
        if (prevSettings[cle] !== currentSettings[cle]) {
            return false
        }
    }

    return true
}

function ThemeSettings() {
    const theme = useTheme()
    const colorScheme = useColorScheme()

    const { state, setStateItem, getStateItemCopy } = Feature.Use.State()
    const locale = Feature.Use.Locales()
    const data = Feature.Use.Data()
    const task = Feature.Use.Task()

    const [prevSettings, setPrevSettings] = useState(
        getCurrentSettings(getStateItemCopy)
    )

    const currentSettings = useMemo(
        () => ({
            vx_ui_scale: state.vx_ui_scale,
            vx_ui_color_scheme: state.vx_ui_color_scheme,
            vx_ui_color: state.vx_ui_color,
            vx_ui_icons: state.vx_ui_icons,
            vx_ui_font_family: state.vx_ui_font_family,
            vx_ui_font_family_monospace: state.vx_ui_font_family_monospace,
        }),
        [
            state.vx_ui_color,
            state.vx_ui_color_scheme,
            state.vx_ui_font_family,
            state.vx_ui_font_family_monospace,
            state.vx_ui_icons,
            state.vx_ui_scale,
        ]
    )

    return (
        <Stack h="100%">
            <ScrollArea h="100%">
                <Stack
                    h="100%"
                    justify="flex-start"
                    align="center"
                    gap={16}
                    style={{ padding: '32px 10%' }}
                >
                    <SysIcon iconName="gnome-settings-theme" size={48} />
                    <Space h="xl" />
                    <NumberInput
                        label={locale('Scale')}
                        description={locale(
                            'Set the display scale of the Vixen Sell UI'
                        )}
                        value={state.vx_ui_scale}
                        onChange={(value) => setStateItem('vx_ui_scale', value)}
                        decimalScale={2}
                        fixedDecimalScale
                        min={0.5}
                        max={5}
                        step={0.05}
                        w="100%"
                    />
                    <Divider my="md" w="100%" />
                    <Group grow w="100%" gap={64}>
                        <Group justify="space-between">
                            <Checkbox
                                label={locale('Color scheme')}
                                description={locale(
                                    'Use a custom color scheme'
                                )}
                                variant="outline"
                                checked={Boolean(state.vx_ui_color_scheme)}
                                onChange={() => {
                                    setStateItem(
                                        'vx_ui_color_scheme',
                                        (prevValue) =>
                                            prevValue === null
                                                ? colorScheme
                                                : null
                                    )
                                }}
                            />
                            <Switch
                                onLabel={<Icon iconName="sun" size={16} />}
                                offLabel={<Icon iconName="moon" size={16} />}
                                checked={
                                    state.vx_ui_color_scheme === 'dark'
                                        ? false
                                        : true
                                }
                                onChange={() =>
                                    setStateItem(
                                        'vx_ui_color_scheme',
                                        (prevValue) =>
                                            prevValue === 'dark'
                                                ? 'light'
                                                : 'dark'
                                    )
                                }
                                style={{
                                    display: state.vx_ui_color_scheme
                                        ? 'unset'
                                        : 'none',
                                }}
                                size="lg"
                            />
                        </Group>
                        <NativeSelect
                            label={locale('Primary color')}
                            description={locale('Set primary color')}
                            data={Object.keys(theme.colors)}
                            value={theme.primaryColor}
                            onChange={(event) =>
                                setStateItem(
                                    'vx_ui_color',
                                    event.currentTarget.value
                                )
                            }
                            rightSection={
                                <ColorSwatch color={theme.primaryColor} />
                            }
                            w="100%"
                        />
                    </Group>
                    <Divider my="md" w="100%" />
                    <Group grow w="100%" gap={64}>
                        <Group justify="center" gap={32}>
                            <Icon iconName="address-book" size={32} />
                            <Icon iconName="cactus" size={32} />
                            <Icon iconName="file-py" size={32} />
                            <Icon iconName="infinity" size={32} />
                        </Group>
                        <NativeSelect
                            label={locale('Icon style')}
                            description={locale('Set Vixen Shell icon style')}
                            data={[
                                'thin',
                                'light',
                                'regular',
                                'bold',
                                'duotone',
                            ]}
                            value={state.vx_ui_icons}
                            onChange={(event) =>
                                setStateItem(
                                    'vx_ui_icons',
                                    event.currentTarget.value
                                )
                            }
                            w="100%"
                        />
                    </Group>
                    <Divider my="md" w="100%" />
                    <Group grow w="100%" gap={64}>
                        <NativeSelect
                            label={locale('Font family')}
                            description={locale(
                                'Set the Vixen Shell font family'
                            )}
                            data={[
                                'default',
                                ...(data.get('fonts', {
                                    name: 'available_fonts',
                                }) || []),
                            ]}
                            value={state.vx_ui_font_family || 'default'}
                            onChange={(event) => {
                                if (event.currentTarget.value === 'default') {
                                    setStateItem('vx_ui_font_family', null)
                                } else {
                                    setStateItem(
                                        'vx_ui_font_family',
                                        event.currentTarget.value
                                    )
                                }
                            }}
                            w="100%"
                        />
                        <NativeSelect
                            label={locale('Monospace font family')}
                            description={locale(
                                'Set the Vixen Shell monospace font family'
                            )}
                            data={[
                                'default',
                                ...(data.get('monospace_fonts', {
                                    name: 'available_fonts',
                                    args: [true],
                                }) || []),
                            ]}
                            value={
                                state.vx_ui_font_family_monospace || 'default'
                            }
                            onChange={(event) => {
                                if (event.currentTarget.value === 'default') {
                                    setStateItem(
                                        'vx_ui_font_family_monospace',
                                        null
                                    )
                                } else {
                                    setStateItem(
                                        'vx_ui_font_family_monospace',
                                        event.currentTarget.value
                                    )
                                }
                            }}
                            w="100%"
                        />
                    </Group>
                </Stack>
            </ScrollArea>
            <Group justify="space-between" style={{ padding: '32px 10%' }}>
                <Button
                    disabled={compareSettings(prevSettings, currentSettings)}
                    variant="outline"
                    onClick={() =>
                        task.run('restore_theme_settings', [prevSettings])
                    }
                >
                    {locale('Restore')}
                </Button>
                <Button
                    disabled={compareSettings(prevSettings, currentSettings)}
                    variant="outline"
                    onClick={() => {
                        task.run('save_theme_setting', [
                            Object.keys(prevSettings),
                        ])
                        setPrevSettings(getCurrentSettings(getStateItemCopy))
                    }}
                >
                    {locale('Save')}
                </Button>
            </Group>
        </Stack>
    )
}

export default ThemeSettings
