package ar.utn.lab4.tp3.repository;

import ar.utn.lab4.tp3.model.PreferenceMP;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPreferenceMP extends JpaRepository<PreferenceMP, String> {
}
