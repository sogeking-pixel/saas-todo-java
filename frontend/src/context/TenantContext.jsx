import React, { createContext, useContext, useState, useEffect } from "react";

import { getTenant } from "../api/apiTenant";


export const TenantContext = createContext();


export function TenantProvider({ children }){
    const [tenant, setTenant] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      const fetchTenant = async () => {
        try {
          const resp = await getTenant();
          if (!resp?.data) throw new Error("Can't load tenant data");
          setTenant(resp.data);
        } catch (error) {
          console.error("Error fetching tenant:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchTenant();
    }, []);

    
    return (
      <TenantContext.Provider value={{ tenant, loading }}>
        {children}
      </TenantContext.Provider>
    );

}

