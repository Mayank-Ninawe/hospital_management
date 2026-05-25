const fs = require("fs");  
const content = `  
import React, { useState, useEffect } from 'react';  
import { DoorOpen, Plus, UserCircle, Hash } from 'lucide-react';  
import { useHmsStore } from '../store/hmsStore';  
import { LiquidGlassCard } from '../components/ui/LiquidGlassCard';  
import { LiquidGlassButton } from '../components/ui/LiquidGlassButton';  
import { EmptyState } from '../components/ui/EmptyState';  
import { Badge } from '../components/ui/Badge';  
import { Modal } from '../components/ui/Modal';  
import { Toast } from '../components/ui/Toast';  
import { useToast } from '../hooks/useToast';  
import { Room } from '../types';  
 
