
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Building, ChevronDown, X, MapPin } from 'lucide-react';
import type { City } from '@/data/mockData';

interface CitySelectorProps {
  cities: City[];
  selectedCities: string[];
  onSelectionChange: (cities: string[]) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({
  cities,
  selectedCities,
  onSelectionChange
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCityToggle = (cityName: string) => {
    if (selectedCities.includes(cityName)) {
      onSelectionChange(selectedCities.filter(c => c !== cityName));
    } else if (selectedCities.length < 6) {
      onSelectionChange([...selectedCities, cityName]);
    }
  };

  const handleRemoveCity = (cityName: string) => {
    onSelectionChange(selectedCities.filter(c => c !== cityName));
  };

  const getTierColor = (tier: number) => {
    switch (tier) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 2: return 'bg-gradient-to-r from-blue-400 to-purple-500';
      case 3: return 'bg-gradient-to-r from-green-400 to-teal-500';
      default: return 'bg-gray-400';
    }
  };

  const groupedCities = cities.reduce((acc, city) => {
    if (!acc[city.state]) {
      acc[city.state] = [];
    }
    acc[city.state].push(city);
    return acc;
  }, {} as Record<string, City[]>);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building className="h-5 w-5 text-orange-600" />
            <span>Select Cities for Comparison</span>
            <Badge variant="secondary" className="text-xs">
              {selectedCities.length}/6 selected
            </Badge>
          </div>
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Add Cities</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 max-h-96 overflow-y-auto bg-white z-50">
              {Object.entries(groupedCities).map(([state, stateCities]) => (
                <div key={state}>
                  <DropdownMenuLabel className="text-sm font-semibold text-gray-700">
                    {state}
                  </DropdownMenuLabel>
                  {stateCities.map((city) => (
                    <DropdownMenuItem
                      key={city.id}
                      className="flex items-center space-x-3 p-3 cursor-pointer hover:bg-orange-50"
                      onClick={() => handleCityToggle(city.name)}
                    >
                      <Checkbox
                        checked={selectedCities.includes(city.name)}
                        onChange={() => {}}
                        className="pointer-events-none"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">{city.name}</span>
                          <div className={`w-2 h-2 rounded-full ${getTierColor(city.tier)}`} />
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Pop: {city.population}M • Tier {city.tier}
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {selectedCities.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedCities.map((cityName) => {
              const city = cities.find(c => c.name === cityName);
              return (
                <Badge
                  key={cityName}
                  variant="secondary"
                  className="flex items-center space-x-2 px-3 py-1 bg-orange-100 text-orange-800 hover:bg-orange-200 transition-colors"
                >
                  <span>{cityName}</span>
                  {city && (
                    <div className={`w-2 h-2 rounded-full ${getTierColor(city.tier)}`} />
                  )}
                  <button
                    onClick={() => handleRemoveCity(cityName)}
                    className="ml-1 hover:text-red-600 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <MapPin className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No cities selected. Click "Add Cities" to start comparing.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CitySelector;
