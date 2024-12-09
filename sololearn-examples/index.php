<?php

// Просто для теста создавал
abstract class Calc {
  abstract public function calculate($param);

  protected function getConst() {
    return 4;
  }
}

class FixedCalc extends Calc {
  public function calculate($param) {
    return $this->getConst() + $param;
  }
}

$obj = new FixedCalc();
echo $obj->calculate(38);
