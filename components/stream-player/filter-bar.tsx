import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { effectsList } from '@/lib/effect-config';
import { Button } from '../ui/button';
import { Hint } from '../hint';

export interface FilterBar {
    features: string;
    filters: string[];
    hasSlider: boolean;
}
export interface DataVoiceParams {
    pitch: number;
    formant: number;
    reverb: number;
    delay: number;
}
const FilterBar = ({ applyEffect, applyEffectWithParams, applyVoiceEffectWithParams }: { applyEffect: (effect: any, sliderValue?: number) => void, applyEffectWithParams: (params: any) => void, applyVoiceEffectWithParams: (params: DataVoiceParams) => void }) => {
    const [activeFeature, setActiveFeature] = useState('');
    const [activeCategory, setActiveCategory] = useState('');
    const [activeEffect, setActiveEffect] = useState<any>(null);
    const [sliderValue, setSliderValue] = useState(50);
    const [dataVoice, setDataVoice] = useState({
        pitch: 0,
        formant: 0,
        reverb: 0,
        delay: 0
    });

    const handleFeatureClick = (featureId: string) => {
        setActiveFeature(featureId);
        const feature = effectsList.find(f => f.id === featureId);
        if (feature?.categories?.length && feature.categories.length > 0) {
            setActiveCategory(feature.categories[0].id);
            const firstEffect = feature.categories[0].effects?.[0];
            if (firstEffect) {
                setActiveEffect(firstEffect);
            }
        }
        setSliderValue(50)
    }

    const handleCategoryClick = (categoryId: string) => {
        setActiveCategory(categoryId);
        const effects = effectsList.find(f => f.id === activeFeature)
            ?.categories?.find(c => c.id === categoryId)?.effects;
        if (effects && effects.length > 0) {
            setActiveEffect(effects[0]);
            applyEffect(effects[0].name)
        }
    }

    const handleEffectClick = (effect: any) => {
        setActiveEffect(effect);
        if (effect.control === 'slider') {
            setSliderValue(50);
        }
        if (effect.type === "voice") {
            console.log("applyVoiceEffectWithParams", dataVoice)
            applyVoiceEffectWithParams(dataVoice)
        } else {
            applyEffect(effect.name)
        }
    }

    const getEffects = () => {
        if (!activeFeature || !activeCategory) return [];
        return effectsList.find(f => f.id === activeFeature)
            ?.categories?.find(c => c.id === activeCategory)?.effects || [];
    }

    const handleSliderChange = (value: number[], arg: string, params: any, type: string) => {
        setSliderValue(value[0]);
        if (type !== "voice") {
            const normalizedValue = Number((value[0]/100).toFixed(2))
            const paramsString = `${params}({${arg}:${normalizedValue}})`
            if (activeEffect) {
                applyEffectWithParams(paramsString);
            }
        }
    };

    const handleSliderPointerUp = (type: string, params: any, arg: string) => {
        if (activeEffect?.type === "voice") {
            const normalizedValue = (sliderValue)
            setDataVoice({
                ...dataVoice,
                [arg]: normalizedValue
            })
            console.log(dataVoice)
            applyVoiceEffectWithParams(dataVoice)
        }
    };

    return (
        <div className="w-full bg-[#18181B]/80 backdrop-blur-sm border-t border-[#2D2E35] rounded-t-lg">
            <ScrollArea className="w-full">
                <div className="p-4">
                    <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
                        {effectsList.map((feature) => (
                            <Button
                                key={feature.id}
                                onClick={() => handleFeatureClick(feature.id)}
                                className={cn(
                                    "px-3 py-1.5 rounded-full text-sm transition",
                                    activeFeature === feature.id 
                                        ? "bg-white text-black" 
                                        : "bg-[#2D2E35] text-white hover:bg-[#3F3F46]"
                                )}
                                variant="ghost"
                            >
                                {feature.label}
                            </Button>
                        ))}
                    </div>
                    {activeFeature && (
                        <div className="flex flex-col items-center justify-center gap-2 mt-3">
                            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
                                {effectsList.find(f => f.id === activeFeature)?.categories?.map((category) => (
                                    <Button
                                        key={category.id}
                                        onClick={() => handleCategoryClick(category.id)}
                                        className={cn(
                                            "px-3 py-1.5 rounded-full text-sm transition",
                                            activeCategory === category.id
                                                ? "bg-white/90 text-black"
                                                : "bg-[#2D2E35] text-white hover:bg-[#3F3F46]"
                                        )}
                                        variant="ghost"
                                    >
                                        {category.label}
                                    </Button>
                                ))}
                            </div>
                            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 mt-2">
                                {getEffects().length > 1 && getEffects().map((effect: any, index: number) => (
                                    <Hint key={`${effect.name}-${index}`} label={effect.label || effect.name.replace('.zip', '')} side="bottom" asChild>
                                      <Button
                                          onClick={() => handleEffectClick(effect)}
                                          className={cn(
                                              "px-3 py-1.5 rounded-full text-sm transition",
                                              activeEffect?.name === effect.name
                                                  ? "bg-white/80 text-black"
                                                  : "bg-[#2D2E35] text-white hover:bg-[#3F3F46]"
                                          )}
                                          variant="ghost"
                                      >
                                          <img src={effect.icon} alt={effect.name} width={20} height={20} />
                                      </Button>
                                    </Hint>
                                ))}
                            </div>
                            {activeEffect?.control === 'slider' && (
                                <div className="mt-4 px-4 w-full max-w-[300px]">
                                    <Slider
                                        value={[sliderValue]}
                                        onValueChange={(value) => handleSliderChange(value, activeEffect.arg, activeEffect.params[0], activeEffect.type)}
                                        onPointerUp={(value) => handleSliderPointerUp(activeEffect.type, activeEffect.params[0], activeEffect.arg)}
                                        min={activeEffect?.minValue ? parseInt(activeEffect.minValue) : 0}
                                        max={100}
                                        step={1}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
};

export default FilterBar;